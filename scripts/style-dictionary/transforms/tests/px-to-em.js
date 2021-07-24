const test = require('ava');
const toEm = require('../px-to-em');

test('Should return a numeric value with em unit', (t) => {
    t.is(toEm({ value: '16px' }), '1em');

    t.is(toEm({ value: '16.5px' }), '1.03125em');
});

test('Should only transform px values', (t) => {
    t.is(toEm({ value: '16em' }), '16em');
});
