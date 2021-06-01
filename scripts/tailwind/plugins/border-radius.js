// https://tailwindcss.com/docs/plugins
module.exports = (props) => {
    return ({ addUtilities }) => {
        const utils = {};

        Object.entries(props).forEach(([name, value]) => {
            utils[`.border-radius-${name}`] = {
                'border-radius': value,
            };
        });

        addUtilities(utils);
    };
};
