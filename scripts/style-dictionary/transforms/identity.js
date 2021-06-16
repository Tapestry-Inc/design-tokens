const config = require('../identity.config');

/**
 * Creates an options object with default fallbacks.
 * @param {object} attributes - A property's `attributes` object.
 * @returns {object}
 */
const getOptions = (attributes) => {
    const { category, type } = attributes;
    const defaults = {
        prefix: type,
        nameStart: 'item',
        exports: {
            vars: true,
        },
    };

    if (!config[category]) return defaults;

    const options = config[category][type] || config[category].default;

    return Object.assign(defaults, options || {});
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
                css: `--${varName}`,
                scss: `$${varName}`,
            },
        },
    };
};
