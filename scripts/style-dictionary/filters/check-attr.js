/**
 * Checks attribute(s) against condition.
 * Can check 1 attribute, or an array of attributes.
 * @param {string|array} attr - The attribute key to check.
 * @param {string|function} expected - The expected attribute value, or a function is passed the current attribute value and returns a boolean.
 * @param {boolean} cond - Whether the expected value should match, or not.
 * @returns {boolean}
 * @example
 *      // category === 'color'
 *      checkAttr('category', 'color');
 *
 *      // Using a function
 *      // category === 'color' || category === 'size'
 *      checkAttr('category', (value) => value === 'color' || value === 'size');
 *
 *      // category !== 'color'
 *      checkAttr('category', 'color', false);
 *
 *      // category === 'color' && type !== 'primary'
 *      checkAttr([
 *          [ 'category', 'color' ],
 *          [ 'type', 'primary', false ]
 *      ]);
 */
module.exports = (attr, expected, cond = true) => {
    const transform = (value, expectedValue, cond) => {
        if (typeof expectedValue === 'function') {
            return expectedValue(value);
        } else return (value === expectedValue) === cond;
    };

    return (prop) => {
        if (Array.isArray(attr)) {
            return attr.every(([attr, expected, cond = true]) =>
                transform(prop.attributes[attr], expected, cond)
            );
        }

        return transform(prop.attributes[attr], expected, cond);
    };
};
