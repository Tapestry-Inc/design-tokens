module.exports = {
    extends: ['eslint:recommended', 'prettier'],
    env: {
        es2021: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
    },
    rules: {
        // http://eslint.org/docs/rules/#variables
        'no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],
    },
};
