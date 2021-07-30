/**
 * Creates the configuration for each brand.
 */
const { paths } = require('../../constants');
const checkAttr = require('./filters/check-attr');

const createConfig = (brand, theme, { src, build }) => {
    const isDefaultTheme = theme === 'default';

    const config = {
        include: [`${paths.src.root}global/**/*.json`],
        source: [`${src}**/*.json`],
    };

    if (!isDefaultTheme) {
        config.include = [
            `${paths.src.root}global/**/*.json`,
            `${paths.src.brands}default/**/*.json`,
        ];
        config.source = [`${src}**/*.json`];
    }

    config.platforms = {
        'CSS variables': {
            transformGroup: 'css-custom',
            buildPath: build,
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
            buildPath: build,
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
            buildPath: build,
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
            buildPath: build,
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
            buildPath: `${build}icon/`,
            source: isDefaultTheme
                ? [`${paths.src.root}global/asset/icon/`, `${src}asset/icon/`]
                : [
                      `${paths.src.root}global/asset/icon/`,
                      `${paths.src.brands}${brand}/default/asset/icon/`,
                      `${src}asset/icon/`,
                  ],
            actions: ['svg-optimize'],
        },
        'Logo optimize': {
            buildPath: `${build}logo/`,
            source: isDefaultTheme
                ? [`${src}asset/logo/`]
                : [
                      `${paths.src.brands}${brand}/default/asset/logo/`,
                      `${src}asset/logo/`,
                  ],
            actions: ['svg-optimize'],
        },
        'Token properties': {
            buildPath: `${build}properties/`,
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
                    destination: 'border-width.json',
                    format: 'json/properties',
                    filter: {
                        attributes: {
                            type: 'border-width',
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
                    destination: 'border-radius.json',
                    format: 'json/properties',
                    filter: {
                        attributes: {
                            type: 'border-radius',
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
                    destination: 'box-shadow.json',
                    format: 'json/properties',
                    filter: {
                        attributes: {
                            category: 'effect',
                            type: 'box-shadow',
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
    };

    return config;
};

module.exports = createConfig;
