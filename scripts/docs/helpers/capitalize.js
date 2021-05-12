/**
 * Capitalize text.
 * @param {array|string} words - The text to act on.
 * @returns {string}
 */
module.exports = (words) => {
    const parts = Array.isArray(words) ? words : words.split(' ');
    const format = (part) => part.charAt(0).toUpperCase() + part.slice(1);

    return parts.map(format).join(' ');
};
