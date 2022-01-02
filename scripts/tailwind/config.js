/**
 * Creates a configuration for each brand.
 * See {@link https://tailwindcss.com/docs} for options.
 */
const fs = require('fs-extra');
const pluginLineHeight = require('./plugins/line-height');
const pluginLetterSpacing = require('./plugins/letter-spacing');
const pluginBorderRadius = require('./plugins/border-radius');
const pluginBorderColor = require('./plugins/border-color');
const pluginUtilityButton = require('./plugins/utility-button');
const pluginUtilityInput = require('./plugins/utility-input');
const pluginUtilityTypography = require('./plugins/utility-typography');
const parseProperties = require('./helpers/parse-properties');

const createConfig = (buildPath) => {
    const props = fs.readJsonSync(`${buildPath}/properties/index.json`);

    return {
        // https://tailwindcss.com/docs/theme
        theme: {
            colors: {
                ...parseProperties(props, { category: 'color' }),
            },
            borderWidth: {
                ...parseProperties(props, { type: 'border-width' }),
            },
            borderColor: {
                ...parseProperties(props, {
                    category: 'color',
                    type: 'border-color',
                }),
            },
            boxShadow: {
                ...parseProperties(props, {
                    category: 'effect',
                    type: 'box-shadow',
                }),
            },
            fontFamily: {
                ...parseProperties(props, { type: 'family' }),
            },
            fontSize: {
                ...parseProperties(props, { type: 'font' }),
            },
            screens: {
                ...Object.entries(
                    parseProperties(props, { category: 'viewport' })
                ).reduce((accum, [key, value]) => {
                    accum[key] = { raw: value };

                    return accum;
                }, {}),
            },
        },

        // https://tailwindcss.com/docs/configuration#core-plugins
        corePlugins: [
            'backgroundColor',
            'borderColor',
            'borderWidth',
            'boxShadow',
            'fontFamily',
            'fontSize',
            'textColor',
        ],

        // https://tailwindcss.com/docs/configuring-variants
        // Disable all variants: https://github.com/tailwindlabs/tailwindcss/issues/1911#issuecomment-650607989
        // Enable specific variants buy property: https://github.com/tailwindlabs/tailwindcss/issues/1133#issuecomment-535167002
        variants: [],

        // https://tailwindcss.com/docs/plugins
        plugins: [
            pluginBorderRadius(
                parseProperties(props, { type: 'border-radius' })
            ),
            pluginBorderColor(parseProperties(props, { type: 'border-color' })),
            pluginLineHeight(parseProperties(props, { type: 'line-height' })),
            pluginLetterSpacing(
                parseProperties(props, { type: 'letter-spacing' })
            ),
            pluginUtilityButton(
                parseProperties(
                    props,
                    { category: 'utility', type: 'button' },
                    false
                )
            ),
            pluginUtilityInput(
                parseProperties(
                    props,
                    { category: 'utility', type: 'input' },
                    false
                )
            ),
            pluginUtilityTypography(
                parseProperties(
                    props,
                    { category: 'utility', type: 'typography' },
                    false
                )
            ),
        ],
    };
};

module.exports = createConfig;
