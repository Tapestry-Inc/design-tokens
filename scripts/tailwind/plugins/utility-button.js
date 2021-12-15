// https://tailwindcss.com/docs/plugins
module.exports = (props) => {
    return ({ addUtilities }) => {
        const utils = {};

        Object.values(props).forEach(({ value, attributes, path }) => {
            const { item } = attributes;
            const key = `.button-${item}`;
            const prop = path.pop();

            if (!utils[key]) utils[key] = {};

            utils[key][prop] = value;
        });

        addUtilities(utils);
    };
};
