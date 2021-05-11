/**
 * Get the style type based on category/type.
 * @param {object} prop - A property object.
 * @returns {string}
 */
// [TODO] Refactor this to remove all attribute specifics into some sort of config. This is a bit of a monster.
const getPrefix = ({ category, type }) => {
    if (category === 'color') return category;
    if (category === 'font') return category;
    if (type === 'icon') return type;
    if (category === 'utility') return type;

    if (category === 'effect') {
        if (type === 'box') return 'shadow';
        if (type === 'drop') return 'drop-shadow';
        else return type;
    }

    if (category === 'size') {
        if (type === 'font') return 'text';
        else return type;
    }

    return category;
};

/**
 * Normalize the name to use remove any unneeded parts.
 * @param {object} attributes - The `attributes` object from a property object.
 * @param {array} path - The property object's `path` array.
 * @returns {string}
 */
const normalizeName = ({ category, type, item }, path) => {
    const isSingleName = path.length <= 2;
    const isSizeName = category === 'size';
    const isIconName = type === 'icon';
    const isFamilyName = type === 'family';
    const isFaceName = type === 'face';
    const isUtilityName = category === 'utility';
    const isShadowName =
        (type === 'box' || type === 'drop') && item === 'shadow';

    // Remove category and type from name
    if (isIconName || isFamilyName || isFaceName || isUtilityName) {
        return path.slice(2).join('-');
    }

    // Use last word
    if (isSingleName || isShadowName || isSizeName) {
        return path[path.length - 1];
    }

    // Use last 2 words
    return path.slice(-2).join('-');
};

/**
 * Creates an object that contains the identity name for each format.
 * @param {object} prop - A property object.
 * @returns {object}
 */
module.exports = ({ attributes, path }) => {
    const prefix = getPrefix(attributes);
    const name = normalizeName(attributes, path);
    const isIcon = attributes.type === 'icon';
    const isFontFace = attributes.type === 'face';
    const isFontTrack = attributes.type === 'track';
    const isUtility = attributes.category === 'utility';
    const noIdent = isIcon || isFontFace || isFontTrack || isUtility;

    if (noIdent) {
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
                css: `--${prefix}-${name}`,
                scss: `$${prefix}-${name}`,
            },
            // [TODO] Deprecate
            css: {
                customProperty: `--${prefix}-${name}`,
                scssVariable: `$${prefix}-${name}`,
            },
        },
    };
};
