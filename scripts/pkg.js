/**
 * Adds and configures needed files for creating an NPM package from the build.
 */
const fs = require('fs-extra');
const { paths } = require('../constants');
const pkg = require(`${paths.root}package.json`);
const log = require(`${paths.scripts.lib}log`)('pkg');

const filesToCopy = ['README.md'];

const copyFiles = () =>
    filesToCopy.forEach((file) => {
        fs.copySync(`${paths.root}${file}`, `${paths.build.root}${file}`);
        log.add(`${paths.build.root}${file}`);
    });

// Add package.json to build
const createPkgFile = () => {
    const filePath = `${paths.build.root}package.json`;

    // Remove unneeded `prepare` script
    delete pkg.scripts.prepare;

    fs.writeJsonSync(filePath, pkg, { spaces: 2 });
    log.add(filePath);
};

log.tag('Building Package Files\n');
copyFiles();
createPkgFile();
