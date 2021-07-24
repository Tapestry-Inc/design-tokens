const test = require('ava');
const identity = require('../identity');

const defaultProps = {
    value: 'null',
    attributes: {
        category: 'none',
        type: 'foo',
        item: 'bar',
    },
    path: ['none', 'foo', 'bar'],
};

const tokenProps = {
    value: '#000000',
    attributes: {
        category: 'color',
        item: 'primary',
    },
    path: ['color', 'primary'],
};

const iconProps = {
    value: 'icon/utility/close.svg',
    original: {
        value: 'close.svg',
    },
    attributes: {
        category: 'asset',
        type: 'icon',
        item: 'utility',
        subitem: 'close',
    },
    path: ['asset', 'icon', 'utility', 'close'],
};

const mediaProps = {
    value: 'screen and (min-width: 0em)',
    name: 'viewport-xs',
    attributes: {
        category: 'viewport',
        type: 'xs',
        identity: {
            prefix: 'viewport',
            name: 'xs',
            vars: {
                scss: '$viewport-xs',
                '@custom-media': '--viewport-xs',
            },
        },
    },
    path: ['viewport', 'xs'],
};

const expectedDefaults = {
    identity: {
        prefix: 'foo',
        name: 'bar',
        vars: {
            css: '--foo-bar',
            scss: '$foo-bar',
        },
    },
};

const expectedTokens = {
    identity: {
        prefix: 'color',
        name: 'primary',
        vars: {
            css: '--color-primary',
            scss: '$color-primary',
        },
    },
};

const expectedIcons = {
    identity: {
        prefix: 'icon',
        name: 'utility-close',
    },
};

const expectedMedia = {
    identity: {
        prefix: 'viewport',
        name: 'xs',
        vars: {
            scss: '$viewport-xs',
            '@custom-media': '--viewport-xs',
        },
    },
};

test('Should return default identifiers', (t) => {
    t.deepEqual(identity(defaultProps), expectedDefaults);
});

test('Should return token identifiers', (t) => {
    t.deepEqual(identity(tokenProps), expectedTokens);
});

test('Should return icon identifiers', (t) => {
    t.deepEqual(identity(iconProps), expectedIcons);
});

test('Should return media-query identifiers', (t) => {
    t.deepEqual(identity(mediaProps), expectedMedia);
});
