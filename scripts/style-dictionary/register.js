/**
 * Helpers to register with Style Dictionary.
 * See API docs for more info {@link https://amzn.github.io/style-dictionary/#/api?id=registeraction}
 * Names are capitalized in order to construct the respective register method.
 */
const checkAttr = require('./filters/check-attr');
const fontFace = require('./formats/css-font-face');
const customMedia = require('./formats/css-custom-media');
const jsonProperties = require('./formats/json-properties');
const sizeUnitless = require('./transforms/size-unitless');
const sizePXtoEM = require('./transforms/px-to-em');
const nameKabab = require('./transforms/name-kabab');
const capitalize = require('./transforms/capitalize');
const assetPath = require('./transforms/asset-path');
const identity = require('./transforms/identity');
const svgOptimize = require('./actions/svg-optimize');
const quoteURL = require('./transforms/quote-url');

module.exports = {
    Action: [
        {
            name: 'svg-optimize',
            do: svgOptimize.copy,
            undo: svgOptimize.clear,
        },
    ],
    Filter: [],
    Format: [
        {
            name: 'css/font-face',
            formatter: fontFace,
        },
        {
            name: 'css/custom-media',
            formatter: customMedia,
        },
        {
            name: 'json/properties',
            formatter: jsonProperties,
        },
    ],
    Template: [],
    Transform: [
        {
            name: 'value/quote-url',
            type: 'value',
            transformer: quoteURL,
        },
        {
            name: 'asset/path',
            type: 'value',
            transformer: assetPath,
        },
        {
            name: 'attribute/identity',
            type: 'attribute',
            transformer: identity,
        },
        {
            name: 'name/identity/capitalize',
            type: 'name',
            transformer: ({ name }) => capitalize(name.split('-'), ' '),
        },
        {
            name: 'name/identity/kabab',
            type: 'name',
            transformer: nameKabab,
        },
        {
            name: 'size/line-height/unitless',
            type: 'value',
            matcher: checkAttr('type', 'line-height'),
            transformer: sizeUnitless,
        },
        {
            name: 'size/pxToEm',
            type: 'value',
            matcher: checkAttr('type', 'breakpoint'),
            transformer: sizePXtoEM,
        },
    ],
    TransformGroup: [
        {
            name: 'css-custom',
            transforms: [
                'attribute/cti',
                'attribute/identity',
                'name/identity/kabab',
                'value/quote-url',
                'size/pxToRem',
                'size/pxToEm',
                'size/line-height/unitless',
                'color/css',
            ],
        },
        {
            name: 'json-properties',
            transforms: [
                'attribute/cti',
                'attribute/identity',
                'name/identity/kabab',
                'size/pxToRem',
                'size/pxToEm',
                'size/line-height/unitless',
                'color/css',
                'asset/path',
            ],
        },
    ],
};
