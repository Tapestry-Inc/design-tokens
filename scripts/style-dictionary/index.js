/**
 * Runs build for each brand.
 */
const StyleDictionary = require('style-dictionary');
const createConfig = require('./create-config');
const registrations = require('./register.config');
const { brands, paths } = require('../../constants');
const log = require(`${paths.scripts.lib}log`)('style-dictionary');

// Register helpers
Object.entries(registrations).forEach(([type, configs]) =>
    configs.forEach((config) => StyleDictionary[`register${type}`](config))
);

// Build each brand's themes
Object.keys(brands).forEach((brand) => {
    Object.keys(brands[brand]).forEach((theme) => {
        log.tag(
            `${brand.replace('-', ' ').toUpperCase()}: ${theme
                .replace('-', ' ')
                .toUpperCase()}`
        );

        const styleDictionary = StyleDictionary.extend(
            createConfig(brand, theme, brands[brand][theme])
        );

        styleDictionary.cleanAllPlatforms();
        styleDictionary.buildAllPlatforms();
    });
});
