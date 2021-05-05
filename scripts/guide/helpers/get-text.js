/**
 * Returns text example based on `state` of the utility.
 * @param {object} attrs - The property's `attributes` object.
 * @returns {string}
 */
module.exports = (attrs) => {
    switch (attrs.state) {
        case 'display':
            return 'This is a Headline';

        case 'body':
            return 'Tapestry is a global house of brands powered by optimism, innovation, and inclusivity. We believe true luxury is a freedom of expression that ignites confidence and authenticity. At Tapestry, anyone from anywhere can have the best idea, and with hard work and dedication, anything is possible.';

        case 'eyebrow':
            return 'Eyebrow Text';

        case 'cta':
            return 'CTA Text';

        case 'badge':
            return 'Badge Text';

        default:
            return 'We are a global house of brands.';
    }
};
