/**
 * Creates the configuration for each brand.
 */
const { brands, paths } = require('../../constants');
const checkAttr = require('./filters/check-attr');

module.exports = brands.map((brand) => [
    brand,
    {
        include: [`${paths.src.root}@global/**/*.json`],
        source: [`${paths.src.root}${brand}/**/*.json`],
        platforms: {
            'css/variables': {
                description: 'CSS variables',
                transformGroup: 'css-custom',
                buildPath: `${paths.build.root}${brand}/`,
                files: [
                    {
                        format: `css/variables`,
                        destination: `variables.css`,
                        filter: checkAttr([
                            ['type', 'face', false],
                            ['category', 'viewport', false],
                        ]),
                    },
                ],
            },
            'css/font-face': {
                description: 'CSS @font-face rules',
                buildPath: `${paths.build.root}${brand}/`,
                transforms: ['attribute/cti', 'name/cti/kebab'],
                files: [
                    {
                        format: 'css/font-face',
                        destination: 'font-face.css',
                        filter: {
                            attributes: {
                                category: 'font',
                                type: 'face',
                            },
                        },
                    },
                ],
            },
            'css/custom-media': {
                description: 'CSS @custom-media variables',
                buildPath: `${paths.build.root}${brand}/`,
                transforms: ['attribute/cti', 'name/cti/kebab'],
                files: [
                    {
                        format: 'css/custom-media',
                        destination: 'custom-media.css',
                        filter: {
                            attributes: {
                                category: 'viewport',
                            },
                        },
                    },
                ],
            },
            'scss/variables': {
                description: 'SCSS variables',
                transformGroup: 'css-custom',
                buildPath: `${paths.build.root}${brand}/`,
                files: [
                    {
                        format: `scss/variables`,
                        destination: `_variables.scss`,
                        filter: checkAttr([['type', 'face', false]]),
                    },
                ],
            },
            properties: {
                description: 'Data for generating token documentation',
                buildPath: `${paths.build.root}${brand}/properties/`,
                transformGroup: 'json-custom',
                files: [
                    {
                        destination: 'index.json',
                        format: 'json/properties',
                    },
                    {
                        destination: 'color.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'color',
                            },
                        },
                    },
                    {
                        destination: 'font-family.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'font',
                                type: 'family',
                            },
                        },
                    },
                    {
                        destination: 'font-size.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'size',
                                type: 'font',
                            },
                        },
                    },
                    {
                        destination: 'letter-spacing.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'size',
                                type: 'letter-spacing',
                            },
                        },
                    },
                    {
                        destination: 'line-height.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'size',
                                type: 'line-height',
                            },
                        },
                    },
                    {
                        destination: 'viewport.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'viewport',
                            },
                        },
                    },
                ],
            },
        },
    },
]);
