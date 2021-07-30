const test = require('ava');
const format = require('../json-properties');

const dictionary = {
    allProperties: [
        {
            attributes: {
                identity: {
                    prefix: 'color',
                    name: 'primary',
                },
            },
        },
    ],
};

const expected = JSON.stringify(
    {
        'color-primary': {
            attributes: {
                identity: {
                    prefix: 'color',
                    name: 'primary',
                },
            },
        },
    },
    null,
    2
);

test('should create a properties object keyed by token name', (t) => {
    t.is(format({ dictionary }), expected);
});
