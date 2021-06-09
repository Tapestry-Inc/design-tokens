/**
 * Creates a configuration for each brand.
 * See {@link https://tailwindcss.com/docs} for options.
 */
const fs = require('fs-extra');
const { brands, paths } = require('../../constants');
const pluginLineHeight = require('./plugins/line-height');
const pluginLetterSpacing = require('./plugins/letter-spacing');
const pluginBorderRadius = require('./plugins/border-radius');
const pluginUtilityTypography = require('./plugins/utility-typography');
const parseProperties = require('./helpers/parse-properties');

module.exports = module.exports = brands.map((brand) => {
    const jsonPath = `${paths.build.root}${brand}/properties/`;

    const props = fs.readJsonSync(`${jsonPath}index.json`);

    return [
        brand,
        {
            // https://tailwindcss.com/docs/theme
            theme: {
                colors: {
                    ...parseProperties(props, { category: 'color' }),
                },
                borderWidth: {
                    ...parseProperties(props, { type: 'border-width' }),
                },
                boxShadow: {
                    ...parseProperties(props, {
                        category: 'effect',
                        type: 'box',
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
                pluginLineHeight(
                    parseProperties(props, { type: 'line-height' })
                ),
                pluginLetterSpacing(
                    parseProperties(props, { type: 'letter-spacing' })
                ),
                pluginUtilityTypography(
                    parseProperties(
                        props,
                        {
                            category: 'utility',
                            type: 'typography',
                        },
                        false
                    )
                ),
            ],
        },
    ];
});
