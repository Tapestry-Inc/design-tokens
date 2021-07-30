const test = require('ava');
const createConfig = require('../create-config');

const defaultTheme = {
    brand: 'foo',
    theme: 'default',
    src: 'src/foo/default/',
    build: 'build/foo/',
};
const customTheme = {
    brand: 'foo',
    theme: 'custom',
    src: 'src/foo/custom/',
    build: 'build/foo/themes/custom/',
};

test('should create a config for the default theme', (t) => {
    const { brand, theme } = defaultTheme;
    const { include, source, platforms } = createConfig(
        brand,
        theme,
        defaultTheme
    );

    t.is(include.length, 1);
    t.regex(include[0], /global/);
    t.is(source.length, 1);
    t.regex(source[0], /default/);
    t.truthy(platforms);
});

test('should create a config for a "custom" theme', (t) => {
    const { brand, theme } = customTheme;
    const { include, source, platforms } = createConfig(
        brand,
        theme,
        customTheme
    );

    t.is(include.length, 2);
    t.regex(include[0], /global/);
    t.regex(include[1], /default/);
    t.is(source.length, 1);
    t.regex(source[0], /custom/);
    t.truthy(platforms);
});
