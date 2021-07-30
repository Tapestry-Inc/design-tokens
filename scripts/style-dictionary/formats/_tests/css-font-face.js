const test = require('ava');
const format = require('../css-font-face');

const dictionary = {
    properties: {
        font: {
            track: {
                url: {
                    value: 'https://example.com',
                },
            },
            face: {
                primary: {
                    normal: {
                        family: {
                            value: 'Helvetica',
                        },
                        style: {
                            value: 'normal',
                        },
                        weight: {
                            value: 'normal',
                        },
                        'unicode-range': {
                            value: 'U+26',
                        },
                        stretch: {
                            value: 'normal',
                        },
                        local: {
                            value: ['Helvetica', 'helvetica'],
                        },
                        woff2: {
                            value: 'https://example.com',
                        },
                    },
                },
            },
        },
    },
};

const expected = `@import url("https://example.com");
@font-face {
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  unicode-range: U+26;
  font-stretch: normal;
  font-display: swap;
  src: local("Helvetica"), local("helvetica"),
     url("https://example.com") format("woff2");
}`;

test('should return CSS with `@import` and `@font-face` declarations', (t) => {
    t.is(format({ dictionary }), expected);
});

test('should return CSS with default/optional values changed/removed', (t) => {
    let output = expected;
    const input = Object.assign({}, { dictionary });
    const { track, face } = input.dictionary.properties.font;
    const remove = ['style', 'weight', 'unicode-range'];

    track.url.value = '';
    face.primary.normal.display = { value: 'auto' };
    output = output.replace(/(@import.*\n)/, '');
    output = output.replace('swap', 'auto');
    output = output
        .split('\n')
        .filter((value) => {
            return !remove.find((item) => value.includes(item));
        })
        .join('\n');

    remove.forEach((key) => {
        delete face.primary.normal[key];
    });

    t.is(format(input), output);
});
