// https://tailwindcss.com/docs/plugins
module.exports = (props) => {
    return ({ addUtilities }) => {
        const utils = {};

        Object.values(props).forEach(({ value, attributes, path }) => {
            const { item, subitem, state } = attributes;
            const key = `.text-${item}-${subitem}-${state}`;
            const prop = path.pop();

            if (!utils[key]) utils[key] = {};

            utils[key][prop] = value;
        });

        addUtilities(utils, {
            variants: ['responsive'],
        });
    };
};
