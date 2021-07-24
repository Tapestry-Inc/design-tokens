/**
 * Capitalize text.
 * @param {array|string} text - The text to act on.
 * @param {string} delimiter - The delimiter that should join each word.
 * @param {number} start - Which word to start with capitalization.
 * @returns {string}
 */
module.exports = (text, delimiter = '', start = 0) => {
    const result = text.map((part, index) => {
        if (index < start) return part;

        return part.charAt(0).toUpperCase() + part.slice(1);
    });

    return result.join(delimiter);
};
