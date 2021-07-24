const test = require('ava');
const setPath = require('../asset-path');

const input = {
    attributes: {
        category: 'asset',
    },
    path: ['original', 'path', 'to', 'nope'],
    value: 'media',
};
test('Should return a path', (t) => {
    t.is(setPath(input), 'path/to/media');
});

test('Should only act on properties with category set to "asset"', (t) => {
    const altInput = {
        ...input,
        attributes: {
            category: 'foo',
        },
    };
    t.is(setPath(altInput), 'media');
});
