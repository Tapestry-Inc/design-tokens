const test = require('ava');
const format = require('../css-custom-media');

const dictionary = {
    allProperties: [
        {
            value: 'screen and (min-width: 0em)',
            attributes: {
                type: 'xs',
            },
        },
    ],
};

const expected = '@custom-media --viewport-xs screen and (min-width: 0em);';

test('should return a CSS `@custom-media` variable', (t) => {
    t.is(format({ dictionary }), expected);
});
