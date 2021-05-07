/**
 * Runs build for each brand.
 */
const path = require('path');
const fs = require('fs-extra');
const { brands, paths, pkg } = require('../../constants');
const handlebars = require('./config');
const capitalize = require('./helpers/capitalize');
const tokenConfigs = require(`${paths.scripts.styleDictionary}config`);
const log = require(`${paths.scripts.lib}log`)('docs');

/**
 * Creates a list of the generated css/js assets.
 * @param {number} index - The index of the token config to use.
 * @returns {array} Array of assets paths.
 */
const listAssets = (index) => {
    const [brand, config] = tokenConfigs[index];

    return Object.entries(config.platforms).reduce(
        (accum, [type, { buildPath, description, files }]) => {
            if (type.match(/asset\//)) return accum;

            const relPath = path.relative(
                `${paths.build.root}/${brand}`,
                buildPath
            );

            if (type === 'properties') {
                accum.push(
                    files.map(({ destination }) => {
                        return {
                            desc: description,
                            name: destination,
                            path: `${relPath}/${destination}`,
                        };
                    })
                );
            } else {
                files.forEach(({ destination }) => {
                    accum.push({
                        desc: description,
                        name: destination,
                        collapse: type === 'properties',
                        path: `${relPath}/${destination}`,
                    });
                });
            }

            return accum;
        },
        []
    );
};

const groupByAttr = (props, attr) =>
    props.reduce((acuum, prop) => {
        if (!acuum[prop.attributes[attr]]) acuum[prop.attributes[attr]] = [];
        acuum[prop.attributes[attr]].push(prop);
        return acuum;
    }, {});

brands.forEach(async (brand, index) => {
    const displayBrand = brand.replace('-', ' ').toUpperCase();
    const destPath = `${paths.build.root}${brand}/index.html`;
    const propsPath = `${paths.build.root}${brand}/properties/`;
    const propsExist = await fs.pathExists(propsPath);
    const propsFiles = fs.readdirSync(propsPath, { encoding: 'utf8' });

    log.tag(`Building ${displayBrand}\n`);

    if (!propsExist) {
        return log.error(
            `No properties directory found for ${displayBrand} at "${propsPath}"\n`
        );
    }

    const page = fs.readFileSync(`${paths.scripts.docs}page.hbs`, {
        encoding: 'utf8',
    });

    const data = propsFiles.reduce((accum, file) => {
        if (file === 'index.json') return accum;

        const name = file.replace('.json', '');
        const values = Object.values(fs.readJsonSync(`${propsPath}${file}`));

        accum[name] = values;

        return accum;
    }, {});

    const { utility, icon, ...vars } = data;

    icon.forEach((props) => {
        const filePath = `${paths.build.root}${brand}/${props.value}`;
        const isVideoIcon = props.attributes.item === 'video';

        props.svg = {
            background: isVideoIcon ? '#7e7e7e' : 'white',
            source: fs.readFileSync(filePath, { encoding: 'utf8' }),
        };
    });

    const classes = groupByAttr(utility, 'type');

    const icons = groupByAttr(icon, 'item');

    const renderPage = handlebars.compile(page);

    fs.writeFileSync(
        destPath,
        renderPage({
            vars,
            icons,
            classes,
            version: pkg.version,
            assets: listAssets(index),
            brand: capitalize(brand.split('-')),
        })
    );

    log.add(destPath);
});
