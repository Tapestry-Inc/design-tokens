/**
 * Runs build for each brand.
 */
const path = require('path');
const fs = require('fs-extra');
const { brands, paths, pkg } = require('../../constants');
const handlebars = require('./config');
const capitalize = require('./helpers/capitalize');
const createConfig = require(`${paths.scripts.styleDictionary}config`);
const log = require(`${paths.scripts.lib}log`)('docs');

/**
 * Creates a list of the generated css/js assets.
 * @param {object} theme - The theme object (`build` and `src` paths).
 * @param {object} config - The theme's style-dictionary config.
 * @returns {array} Array of assets paths.
 */
const listAssets = (theme, config) => {
    return Object.entries(config.platforms).reduce(
        (accum, [type, { buildPath, files = [] }]) => {
            const relPath = path.relative(theme.build, buildPath);

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

/**
 * Creates an object of groups from an array of properties.
 * @param {array} props - Array of property objects.
 * @param {string} attr - The attribute to use as the group.
 * @returns {object} ?
 */
const groupByAttr = (props, attr) =>
    props.reduce((acuum, prop) => {
        if (!acuum[prop.attributes[attr]]) acuum[prop.attributes[attr]] = [];
        acuum[prop.attributes[attr]].push(prop);
        return acuum;
    }, {});

// Build each brand's themes
Object.keys(brands).forEach((brand) => {
    const displayBrand = brand.replace('-', ' ').toUpperCase();

    Object.keys(brands[brand]).forEach(async (theme) => {
        const displayTheme = theme.replace('-', ' ').toUpperCase();
        const { src, build } = brands[brand][theme];
        const destPath = `${build}index.html`;
        const propsPath = `${build}properties/`;
        const propsExist = await fs.pathExists(propsPath);
        const propsFiles = fs.readdirSync(propsPath, { encoding: 'utf8' });
        const tailwindConfig = require(`${build}properties/tailwind.json`);
        const styleDictionaryConfig = createConfig(brand, theme, {
            src,
            build,
        });

        log.tag(`${displayBrand}: ${displayTheme}\n`);

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
            const values = Object.values(
                fs.readJsonSync(`${propsPath}${file}`)
            );

            accum[name] = values;

            return accum;
        }, {});

        const { utility, icon, logo, tailwind, ...vars } = data;

        const addSVGMeta = (props) => {
            const filePath = `${build}${props.value}`;
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
                assets: listAssets({ src, build }, styleDictionaryConfig),
                brand: capitalize(brand.split('-')),
                theme: capitalize(theme.split('-')),
            })
        );

        log.add(`Built file://${destPath}`);
    });
});
