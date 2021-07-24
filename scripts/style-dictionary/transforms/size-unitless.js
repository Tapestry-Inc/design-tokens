/**
 * Strips the unit from the string
 * @param {object} prop - A property object.
 * @returns {number}
 */
module.exports = ({ original }) => {
    const result = parseFloat(original.value, 10);

    if (Number.isNaN(result)) return original.value;

    return result;
};
