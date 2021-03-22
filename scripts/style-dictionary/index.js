const fs = require('fs-extra');
const StyleDictionary = require('style-dictionary');
const { paths } = require('../../constants');
const configs = require('./config');
const registrations = require('./register');

// Register helpers
Object.entries(registrations).forEach(([type, configs]) =>
    configs.forEach((config) => StyleDictionary[`register${type}`](config))
);

// Copy package files into build directory
['package.json', 'README.md'].forEach((file) =>
    fs.copySync(`${paths.root}${file}`, `${paths.build.root}${file}`)
);

// Build each brand
configs.forEach(([brand, config]) => {
    console.log(`\nBuilding ${brand.replace('-', ' ').toUpperCase()}`);

    const styleDictionary = StyleDictionary.extend(config);

    styleDictionary.cleanAllPlatforms();
    styleDictionary.buildAllPlatforms();

    // Temporary
    fs.copySync(
        './examples/index.html',
        `${paths.build.root}${brand}/index.html`
    );
});