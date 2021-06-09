const rSize = '(none|xs|s|m|l|xl|\\dxl|full)';
const rSide = '(l|t|r|b)';
const rLevel = '(primary|secondary)';
const rColon = '\\\\:';

/* 
Selector array: Objects are ordered by most-to-least specific match.
    
    // The `key` name can be anything (not used used in any business logic), but should match the top-level classname prefix for easier understanding.
    key: [
        {
            type: 'css property' // Should match the declared css property.
            matcher: RegEx // Should match the classname prefix.
        }
    ]
*/

module.exports = {
    bg: [
        {
            type: 'background-color',
            matcher: /^bg-/,
        },
    ],
    border: [
        {
            type: 'border-radius',
            matcher: /^border-radius-/,
        },
        {
            type: 'border-width',
            matcher: new RegExp(`^border(-${rSide})?-${rSize}$`),
        },
        {
            type: 'border-color',
            matcher: /^border-/,
        },
    ],
    font: [
        {
            type: 'font-family',
            matcher: /^font-/,
        },
    ],
    'line-height': [
        {
            type: 'line-height',
            matcher: /^line-height-/,
        },
    ],
    'letter-spacing': [
        {
            type: 'letter-spacing',
            matcher: /^letter-spacing-/,
        },
    ],
    shadow: [
        {
            type: 'box-shadow',
            matcher: /^shadow-/,
        },
    ],
    'drop-shadow': [
        {
            type: 'drop-shadow',
            matcher: /^drop-shadow-/,
        },
    ],
    text: [
        {
            type: 'typography-responsive',
            matcher: new RegExp(
                `^${rSize}${rColon}text-${rLevel}-(.+)-${rSize}`
            ),
        },
        {
            type: 'typography',
            matcher: new RegExp(`^text-${rLevel}-(.+)-${rSize}`),
        },
        {
            type: 'font-size',
            matcher: /^text-\d{1,2}$/,
        },
        {
            type: 'text-color',
            matcher: /^text-/,
        },
    ],
};
