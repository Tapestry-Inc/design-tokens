/**
 * Runs build for each brand.
 */
const StyleDictionary = require('style-dictionary');
const configs = require('./config');
const registrations = require('./register');
const { paths } = require('../../constants');
const log = require(`${paths.scripts.lib}log`)('style-dictionary');

// Register helpers
Object.entries(registrations).forEach(([type, configs]) =>
    configs.forEach((config) => StyleDictionary[`register${type}`](config))
);

// Build each brand
configs.forEach(([brand, config]) => {
    log.tag(`Building ${brand.replace('-', ' ').toUpperCase()}`);

    const styleDictionary = StyleDictionary.extend(config);

    styleDictionary.cleanAllPlatforms();
    styleDictionary.buildAllPlatforms();
});
