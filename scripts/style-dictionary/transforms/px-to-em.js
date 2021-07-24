/**
 * Convert pixel values to rem values
 * @param {object} prop - A style-dictionary property object.
 * @returns {string}
 */
module.exports = ({ value }) => {
    if (!/\dpx$/.test(value)) return value;

    return `${parseFloat(value, 10) / 16}em`;
};
