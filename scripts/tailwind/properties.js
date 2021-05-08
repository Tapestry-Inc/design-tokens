const fs = require('fs-extra');
const { paths } = require('../../constants');
const selectorMap = require('./selector-map');

const attrKeys = ['category', 'type', 'item', 'subitem', 'state', 'substate'];

const getType = (name) => {
    const prefixes = Object.values(selectorMap);

    return prefixes.reduce((acuum, types) => {
        const type = types.find(({ matcher }) => matcher.test(name));

        if (type) acuum = type.type;

        return acuum;
    }, `undefined (update required: ${paths.scripts.tailwind}/selector-map.js)`);
};
const createProperty = (selector, decls) => {
    const name = selector.replace(/^\./, '');
    const path = name.split('-');
    const [category, type] = ['utility', getType(name)];
    const attrVals = [category, type].concat(path);

    const attrs = attrVals.reduce((acuum, value, index) => {
        acuum[attrKeys[index]] = value;
        return acuum;
    }, {});

    return {
        [name]: {
            name,
            value: decls.join(';\n'),
            attributes: {
                ...attrs,
                identity: {
                    prefix: path[0],
                    name: path.slice(1).join('-'),
                    classname: name,
                },
            },
            path: attrVals,
        },
    };
};

const createPropertiesJSON = (brand, data) => {
    const result = {};
    const destPath = `${paths.build.root}${brand}/properties/utility.json`;

    data.root.walkRules(function (rule) {
        const decls = [];

        rule.walkDecls(({ prop, value }) => {
            decls.push(`${prop}: ${value}`);
        });

        Object.assign(result, createProperty(rule.selector, decls, 'temp'));
    });

    fs.writeFileSync(destPath, JSON.stringify(result, null, 2));
};

module.exports = createPropertiesJSON;
