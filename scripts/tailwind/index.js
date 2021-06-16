/**
 * Runs build for each brand.
 */
const fs = require('fs-extra');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const configs = require('./config');
const { paths } = require('../../constants');
const createJSON = require('./properties');
const log = require(`${paths.scripts.lib}log`)('tailwind');

// Build each brand
configs.forEach(async ([brand, config]) => {
    const destPathCSS = `${paths.build.root}${brand}/utilities.css`;
    const destPathConfig = `${paths.build.root}${brand}/properties/tailwind.json`;
    const css = `@import 'tailwindcss/utilities';`;

    const { plugins, ...configOptions } = config;

    fs.ensureDirSync(`${paths.build.root}${brand}`);

    postcss([postcssImport, tailwindcss(config), autoprefixer])
        .process(css, {
            from: `${paths.src.brands}${brand}/`,
            to: destPathCSS,
        })
        .then((result) => {
            log.tag(`Building ${brand.replace('-', ' ').toUpperCase()}\n`);

            fs.writeFileSync(destPathCSS, result.css);

            createJSON(brand, result);

            fs.writeFileSync(
                destPathConfig,
                JSON.stringify(configOptions, null, 2)
            );

            log.add(destPathCSS);
        });
});
