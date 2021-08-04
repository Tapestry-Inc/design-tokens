const urlRegex = require('url-regex');

/**
 * Quote URLs
 * @param {object} prop - The property object.
 * @returns {string}
 */
module.exports = ({ value }) => {
    if (!urlRegex({ strict: true }).test(value)) return value;

    return `'${value}'`;
};
