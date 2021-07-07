const path = require('path');
const pkg = require('./package.json');
const globby = require('globby');

const root = path.resolve(__dirname);
const resolve = (part) => path.normalize(`${path.resolve(root, part)}/`);
const pkgVersion = process.env.NPM_PKG_VERSION || pkg.version;

const createBrands = (brandsPath, buildPath) => {
    const brands = globby.sync('**', {
        deep: 1,
        cwd: brandsPath,
        onlyFiles: false,
    });

    return brands.reduce((accum, brand) => {
        const themes = globby.sync('**', {
            deep: 1,
            cwd: `${constants.paths.src.brands}${brand}`,
            onlyFiles: false,
        });

        accum[brand] = {};

        themes.forEach((theme) => {
            accum[brand][theme] = {
                src: `${constants.paths.src.brands}${brand}/${theme}/`,
                build:
                    theme === 'default'
                        ? `${constants.paths.build.root}${brand}/`
                        : `${constants.paths.build.root}${brand}/themes/${theme}/`,
            };
        });

        return accum;
    }, {});
};

const constants = {
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
            brands: resolve('src/brands'),
        },
    },
};

constants.brands = createBrands(
    constants.paths.src.brands,
    constants.paths.src.build
);

module.exports = constants;
