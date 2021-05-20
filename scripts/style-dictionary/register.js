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
const nameKabab = require('./transforms/name-kabab');
const capitalize = require('./transforms/capitalize');
const iconPath = require('./transforms/icon-path');
const attrIdentity = require('./transforms/attr-identity');
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
            name: 'path/asset/icon',
            type: 'value',
            transformer: iconPath,
        },
        {
            name: 'attribute/identity',
            type: 'attribute',
            transformer: attrIdentity,
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
                'size/line-height/unitless',
                'color/css',
                'path/asset/icon',
            ],
        },
    ],
};
