/**
 * Creates the `src` value for an `@font-face` rule.
 * @param {object} object - A font face item properties object.
 * @returns {string}
 */
const getSources = (props) => {
    const srcs = [];
    const delim = ',\n     ';
    const names = [].concat(props.local.value);
    const formats = [
        'embedded-opentype',
        'opentype',
        'svg',
        'truetype',
        'woff',
        'woff2',
    ];

    const urls = formats.filter((format) => props[format]);

    const locals = names.map((name) => `local("${name}")`).join(', ');

    urls.forEach((format) => {
        return srcs.push(`url("${props[format].value}") format("${format}")`);
    });

    return `${locals}${delim}${srcs.join(delim)}`;
};

const propConfig = {
    'ascent-override': {},
    'descent-override': {},
    'line-gap-override': {},
    'font-display': {
        default: 'swap',
    },
    'font-family': {},
    'font-feature-settings': {},
    'font-variation-settings': {},
    'font-stretch': {},
    'font-style': {},
    'font-variant': {},
    'font-weight': {},
    'size-adjust': {},
    'unicode-range': {},
};

/**
 * Creates an `@font-face` css file.
 * @param {object} object - The Style Dictionary properties object.
 * @returns {string}
 */
module.exports = ({ dictionary }) => {
    const trackURL = dictionary.properties.font.track.url.value;
    const track = trackURL ? `@import url("${trackURL}");\n` : '';
    const configKeys = Object.keys(propConfig);
    const configValues = Object.values(propConfig);
    const fontGroups = Object.values(dictionary.properties.font.face);
    const groupVariants = fontGroups.reduce((acuum, group) => {
        acuum.push(...Object.values(group));
        return acuum;
    }, []);

    const rules = groupVariants.map((variant) => {
        const variantProps = Object.assign({}, variant);

        // Add any property defaults to rule
        configKeys.forEach((key, index) => {
            const shortKey = key.replace('font-', '');

            if (variantProps[key] || variantProps[shortKey]) return;
            if (!configValues[index].default) return;

            variantProps[key] = { value: configValues[index].default };
        });

        // Build rule properties from tokens
        const variantOptions = Object.entries(variantProps).reduce(
            (acuum, [key, { value }]) => {
                let propName = key;
                const fullKey = `font-${key}`;

                if (propConfig[fullKey]) propName = fullKey;
                else if (!propConfig[key]) return acuum;

                acuum.push(`  ${propName}: ${value}`);

                return acuum;
            },
            []
        );

        variantOptions.push(`  src: ${getSources(variantProps)};`);

        return `@font-face {\n${variantOptions.join(';\n')}\n}`;
    });

    return `${track}${rules.join('\n')}`;
};
