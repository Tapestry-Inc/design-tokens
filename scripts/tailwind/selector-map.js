var rSize = '(xs|s|m|l|xl|\\dxl)';
var rLevel = '(primary|secondary)';

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
            type: 'font-size',
            matcher: /^text-\d{1,2}$/,
        },
        {
            type: 'typography',
            matcher: new RegExp(`^text-${rLevel}-display-${rSize}`),
        },
        {
            type: 'typography',
            matcher: new RegExp(`^text-${rLevel}-body-${rSize}`),
        },
        {
            type: 'typography',
            matcher: new RegExp(`^text-${rLevel}-(eyebrow|cta|badge)-${rSize}`),
        },
        {
            type: 'text-color',
            matcher: /^text-/,
        },
    ],
};
