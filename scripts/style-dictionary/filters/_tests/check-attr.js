const test = require('ava');
const checkAttr = require('../check-attr');

const props = {
    attributes: {
        category: 'asset',
        type: 'icon',
    },
};

test('Should return `true` when no condition is passed', (t) => {
    t.true(checkAttr('type', 'icon')(props));
});

test('Should return `true` when a `true` condition is passed', (t) => {
    t.true(checkAttr('type', 'icon', true)(props));
});

test('Should return `false` when a `false` condition is passed', (t) => {
    t.true(checkAttr('type', 'incorrect', false)(props));
});

test('Should check multiple attributes when an array is passed', (t) => {
    t.true(
        checkAttr([
            ['category', 'asset'],
            ['type', 'icon'],
        ])(props)
    );

    t.true(
        checkAttr([
            ['category', 'asset', true],
            ['type', 'incorrect', false],
        ])(props)
    );
});

test('Should accept a function for the `expected` argument', (t) => {
    t.true(checkAttr('category', (value) => value === 'asset')(props));
});
