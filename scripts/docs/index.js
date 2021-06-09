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
        (accum, [type, { buildPath, files = [] }]) => {
            const relPath = path.relative(
                path.join(paths.build.root, brand),
                buildPath
            );

            if (files.length <= 1) {
                files.forEach(({ destination }) => {
                    accum.push({
                        desc: type,
                        name: destination,
                        path: path.join(relPath, destination),
                    });
                });
            } else {
                accum.push(
                    files.map(({ destination }) => {
                        return {
                            desc: type,
                            name: destination,
                            path: path.join(relPath, destination),
                        };
                    })
                );
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
    const tailwindConfig = require(path.join(
        paths.build.root,
        brand,
        'properties/tailwind.json'
    ));
    const destPath = path.join(paths.build.root, brand, 'index.html');
    const propsPath = path.join(paths.build.root, brand, 'properties/');
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

    const { utility, icon, logo, tailwind, ...vars } = data;

    const addSVGMeta = (props) => {
        const filePath = `${paths.build.root}${brand}/${props.value}`;
        const isVideoIcon = props.attributes.item === 'video';
        const needsDarkerBG = isVideoIcon;

        props.svg = {
            background: needsDarkerBG ? 'darker' : 'lighter',
            source: fs.readFileSync(filePath, { encoding: 'utf8' }),
        };

        return props;
    };

    const classes = groupByAttr(utility, 'type');

    const icons = groupByAttr(icon, 'item');

    const renderPage = handlebars.compile(page);

    icon.forEach(addSVGMeta);
    logo.forEach(addSVGMeta);

    Object.keys(data).forEach((key) => log.add(`parsed ${key} section`));

    fs.writeFileSync(
        destPath,
        renderPage({
            vars,
            icons,
            logos: logo,
            classes,
            version: pkg.version,
            viewports: Object.keys(tailwindConfig.theme.screens),
            assets: listAssets(index),
            brand: capitalize(brand.split('-')),
        })
    );

    log.add(`Built file://${destPath}`);
});
