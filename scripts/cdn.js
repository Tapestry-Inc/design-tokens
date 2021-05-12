/**
 * Creates the distribution directory used for CDN.
 */
const fs = require('fs-extra');
const { paths } = require('../constants');
const log = require(`${paths.scripts.lib}log`)('cdn');

(async () => {
    log.tag('Building CDN Distribution\n');

    // Make sure build directory exists
    if (!(await fs.pathExists(paths.build.root))) {
        return log.error(`No build directory found at "${paths.build.root}"\n`);
    }

    // Create versioned assets for package
    fs.copySync(paths.build.root, paths.dist.root);
    fs.copySync(paths.build.root, paths.dist.version);
    log.add(paths.dist.root);
    log.add(paths.dist.version);

    // Remove unneeded package files
    ['package.json', 'README.md'].forEach((file) => {
        fs.removeSync(`${paths.dist.root}${file}`);
        fs.removeSync(`${paths.dist.version}${file}`);
        log.remove(`${paths.dist.root}${file}`);
        log.remove(`${paths.dist.version}${file}`);
    });
})();
