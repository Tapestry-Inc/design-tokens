const test = require('ava');
const capitalize = require('../capitalize');

test('Should capitalize all strings in array correctly', (t) => {
    t.is(capitalize(['one', 'two', 'three']), 'OneTwoThree');
    t.is(capitalize(['one', 'two', 'three'], ' '), 'One Two Three');
    t.is(capitalize(['one', 'two', 'three'], ' ', 1), 'one Two Three');
});

test('Should return a capitalized value from a string', (t) => {
    t.is(capitalize(['capitalize']), 'Capitalize');
});
