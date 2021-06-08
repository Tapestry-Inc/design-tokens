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
    const tailwindFilePath = `${paths.src.brands}${brand}/tailwind.css`;
    const destPathCSS = `${paths.build.root}${brand}/utilities.css`;
    const destPathConfig = `${paths.build.root}${brand}/properties/tailwind.json`;
    const css = fs.readFileSync(tailwindFilePath, 'utf8');

    const { plugins, ...configOptions } = config;

    fs.ensureDirSync(`${paths.build.root}${brand}`);

    postcss([postcssImport, tailwindcss(config), autoprefixer])
        .process(css, {
            from: tailwindFilePath,
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
