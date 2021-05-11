const path = require('path');
const pkg = require('./package.json');

const root = path.resolve(__dirname);
const resolve = (part) => path.normalize(`${path.resolve(root, part)}/`);
const pkgVersion = process.env.NODE_PKG_VERSION || pkg.version;

module.exports = {
    brands: ['coach', 'stuart-weitzman'],
    namespace: {
        prefix: 'dt',
        global: 'DT',
    },
    pkg: {
        name: pkg.name,
        version: pkgVersion,
    },
    paths: {
        root: resolve(root),
        cdn: 'https://assets.tapestry.com/ux/design-tokens/',
        build: {
            root: resolve('build'),
            version: resolve(`build/${pkgVersion}`),
        },
        dist: {
            root: resolve('dist'),
            version: resolve(`dist/${pkgVersion}`),
        },
        scripts: {
            root: resolve('scripts'),
            lib: resolve('scripts/lib'),
            changelog: resolve('scripts/changelog'),
            docs: resolve('scripts/docs'),
            tailwind: resolve('scripts/tailwind'),
            styleDictionary: resolve('scripts/style-dictionary'),
            filters: resolve('scripts/style-dictionary/filters'),
            transforms: resolve('scripts/style-dictionary/transforms'),
        },
        src: {
            root: resolve('src'),
        },
    },
};
