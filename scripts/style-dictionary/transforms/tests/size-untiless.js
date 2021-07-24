const test = require('ava');
const toUnitless = require('../size-unitless');

test('Should strips the unit from the string', (t) => {
    t.is(toUnitless({ original: { value: '16px' } }), 16);

    t.is(toUnitless({ original: { value: '16.5rem' } }), 16.5);
});

test('Should only transform number values', (t) => {
    t.is(toUnitless({ original: { value: 'hello' } }), 'hello');
});
