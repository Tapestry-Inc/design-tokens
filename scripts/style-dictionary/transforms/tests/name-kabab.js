const test = require('ava');
const toKabab = require('../name-kabab');

test('Should return a kabab-case string', (t) => {
    const input = {
        attributes: {
            identity: {
                name: 'bar',
                prefix: 'foo',
            },
        },
    };

    t.is(toKabab(input), 'foo-bar');
});
