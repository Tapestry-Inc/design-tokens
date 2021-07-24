const config = require('../identity.config');

const varsPrefix = {
    css: '--',
    scss: '$',
    '@custom-media': '--',
};

/**
 * Creates an options object with default fallbacks.
 * @param {object} attributes - A token's `attributes` object.
 * @returns {object}
 */
const getOptions = (attributes) => {
    const { category, type } = attributes;
    const defaults = {
        prefix: type,
        nameStart: 'item',
        exports: {
            vars: {
                css: true,
                scss: true,
                '@custom-media': false,
            },
        },
    };

    if (!config[category]) return defaults;

    const options = config[category][type] || config[category].default;

    return Object.assign(defaults, options);
};

/**
 * Creates the `vars` object.
 * @param {object} varTypes - The token's `exports.vars` config object.
 * @param {string} varName - The token's variable name.
 * @returns {object}
 */
const getVariables = (varTypes, varName) => {
    return Object.keys(varsPrefix).reduce((accum, key) => {
        if (varTypes[key]) accum[key] = `${varsPrefix[key]}${varName}`;
        return accum;
    }, {});
};

/**
 * Creates an object that contains the identity name for each format.
 * @param {object} prop - A property object.
 * @returns {object}
 */
module.exports = ({ attributes, path }) => {
    const { prefix, nameStart, exports } = getOptions(attributes);
    const nameStartIndex = path.findIndex((el) => el === attributes[nameStart]);
    const name = path.slice(nameStartIndex).join('-');
    const varName = `${prefix}-${name}`;

    if (!exports.vars) {
        return {
            identity: {
                prefix,
                name,
            },
        };
    }

    return {
        identity: {
            prefix,
            name,
            vars: {
                ...getVariables(exports.vars, varName),
            },
        },
    };
};
