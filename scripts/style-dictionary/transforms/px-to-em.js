module.exports = (prop) => {
    if (!/\dpx$/.test(prop.value)) return prop.value;

    return `${parseFloat(prop.value, 10) / 16}em`;
};
