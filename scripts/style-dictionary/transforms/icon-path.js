/**
 * Set icon path relative to properties file.
 * @param {object} prop - The property object.
 * @param {object} platform - The platform config object.
 * @returns {string}
 */
module.exports = ({ attributes, value }) => {
    if (attributes.type !== 'icon') return value;

    const { type, item } = attributes;

    return `${type}/${item}/${value}`;
};
