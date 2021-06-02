/**
 * Creates the configuration for each brand.
 */
const { brands, paths } = require('../../constants');
const checkAttr = require('./filters/check-attr');

module.exports = brands.map((brand) => [
    brand,
    {
        include: [`${paths.src.root}global/**/*.json`],
        source: [`${paths.src.brands}${brand}/**/*.json`],
        platforms: {
            'CSS variables': {
                transformGroup: 'css-custom',
                buildPath: `${paths.build.root}${brand}/`,
                files: [
                    {
                        format: `css/variables`,
                        destination: `variables.css`,
                        filter: checkAttr([
                            ['type', 'face', false],
                            ['type', 'track', false],
                            ['category', 'viewport', false],
                            ['category', 'utility', false],
                            ['category', 'asset', false],
                        ]),
                    },
                ],
            },
            'CSS @font-face': {
                buildPath: `${paths.build.root}${brand}/`,
                transforms: ['attribute/cti', 'name/cti/kebab'],
                files: [
                    {
                        format: 'css/font-face',
                        destination: 'font-face.css',
                        filter: {
                            attributes: {
                                category: 'font',
                            },
                        },
                    },
                ],
            },
            'CSS @custom-media': {
                buildPath: `${paths.build.root}${brand}/`,
                transforms: ['attribute/cti', 'size/pxToEm', 'name/cti/kebab'],
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
            'SCSS variables': {
                transformGroup: 'css-custom',
                buildPath: `${paths.build.root}${brand}/`,
                files: [
                    {
                        format: `scss/variables`,
                        destination: `_variables.scss`,
                        filter: checkAttr([
                            ['type', 'face', false],
                            ['type', 'track', false],
                            ['category', 'utility', false],
                            ['category', 'asset', false],
                        ]),
                    },
                ],
            },
            'Icon optimize': {
                buildPath: `${paths.build.root}${brand}/icon/`,
                source: [
                    `${paths.src.root}global/asset/icon/`,
                    `${paths.src.brands}${brand}/asset/icon/`,
                ],
                actions: ['svg-optimize'],
            },
            'Logo optimize': {
                buildPath: `${paths.build.root}${brand}/logo/`,
                source: [`${paths.src.brands}${brand}/asset/logo/`],
                actions: ['svg-optimize'],
            },
            'Token properties': {
                buildPath: `${paths.build.root}${brand}/properties/`,
                transformGroup: 'json-properties',
                files: [
                    {
                        destination: 'index.json',
                        format: 'json/properties',
                    },
                    {
                        destination: 'border-radius.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                type: 'border-radius',
                            },
                        },
                    },
                    {
                        destination: 'breakpoint.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                type: 'breakpoint',
                            },
                        },
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
                        destination: 'icon.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'asset',
                                type: 'icon',
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
                        destination: 'logo.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'asset',
                                type: 'logo',
                            },
                        },
                    },
                    {
                        destination: 'shadow.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'effect',
                                type: 'box',
                            },
                        },
                    },
                    {
                        destination: 'spacing.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'size',
                                type: 'spacing',
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
                    {
                        destination: 'utility.json',
                        format: 'json/properties',
                        filter: {
                            attributes: {
                                category: 'utility',
                            },
                        },
                    },
                ],
            },
        },
    },
]);
