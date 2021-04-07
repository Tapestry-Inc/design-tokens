const getSources = (props) => {
    const srcs = [];
    const delim = ',\n     ';
    const names = [].concat(props.local.value);
    const formats = [
        'embedded-opentype',
        'opentype',
        'svg',
        'truetype',
        'woff',
        'woff2',
    ];

    const urls = formats.filter((format) => props[format]);

    const locals = names.map((name) => `local("${name}")`).join(', ');

    urls.forEach((format) => {
        return srcs.push(`url("${props[format].value}") format("${format}")`);
    });

    return `${locals}${delim}${srcs.join(delim)}`;
};

module.exports = ({ dictionary }) => {
    return Object.values(dictionary.properties.font.face)
        .map((group) => {
            return Object.values(group)
                .map((variation) => {
                    const result = [
                        `  font-family: "${variation.family.value}";`,
                    ];

                    if (variation.style)
                        result.push(`  font-style: ${variation.style.value};`);

                    if (variation.weight)
                        result.push(
                            `  font-weight: ${variation.weight.value};`
                        );

                    result.push(
                        `  font-display: ${
                            variation.display ? variation.display.value : 'swap'
                        };`
                    );

                    result.push(`  src: ${getSources(variation)};`);

                    if (variation['unicode-range']) {
                        result.push(
                            `  unicode-range: ${variation['unicode-range']};`
                        );
                    }

                    return `@font-face {\n${result.join('\n')}\n}`;
                })
                .join('\n');
        })
        .join('\n');
};