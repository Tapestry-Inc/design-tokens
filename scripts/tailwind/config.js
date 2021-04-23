/**
 * Creates a configuration for each brand.
 * See {@link https://tailwindcss.com/docs} for options.
 */
const fs = require('fs-extra');
const { brands, paths } = require('../../constants');
const pluginLineHeight = require('./plugins/line-height');
const pluginLetterSpacing = require('./plugins/letter-spacing');
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
                pluginLineHeight(
                    parseProperties(props, { type: 'line-height' })
                ),
                pluginLetterSpacing(
                    parseProperties(props, { type: 'letter-spacing' })
                ),
            ],
        },
    ];
});
