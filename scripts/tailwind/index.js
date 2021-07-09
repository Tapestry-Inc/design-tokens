/**
 * Runs build for each brand.
 */
const fs = require('fs-extra');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const createConfig = require('./config');
const { brands, paths } = require('../../constants');
const createJSON = require('./properties');
const log = require(`${paths.scripts.lib}log`)('tailwind');

// Build each brand's themes
Object.keys(brands).forEach((brand) => {
    Object.keys(brands[brand]).forEach(async (theme) => {
        const { build } = brands[brand][theme];

        const config = createConfig(build);
        const { plugins, ...configOptions } = config;
        const destPathCSS = `${build}utilities.css`;
        const destPathConfig = `${build}properties/tailwind.json`;
        const css = `@import 'tailwindcss/utilities';`;

        fs.ensureDirSync(build);

        postcss([postcssImport, tailwindcss(config), autoprefixer])
            .process(css, {
                from: build,
                to: destPathCSS,
            })
            .then((result) => {
                log.tag(
                    `${brand.replace('-', ' ').toUpperCase()}: ${theme
                        .replace('-', ' ')
                        .toUpperCase()}`
                );

                fs.writeFileSync(destPathCSS, result.css);

                createJSON(brand, result);

                fs.writeFileSync(
                    destPathConfig,
                    JSON.stringify(configOptions, null, 2)
                );

                log.add(destPathCSS);
            });
    });
});
