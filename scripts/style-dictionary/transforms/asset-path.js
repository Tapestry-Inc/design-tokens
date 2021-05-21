/**
 * Set icon path relative to properties file.
 * @param {object} prop - The property object.
 * @returns {string}
 */
module.exports = ({ attributes, value, path }) => {
    if (attributes.category !== 'asset') return value;

    return `${path.slice(1, -1).join('/')}/${value}`;
};
