const chalk = require('chalk');

module.exports = (tag = '') => {
    const prefix = chalk.bold(`\n[${tag.toUpperCase()}] `);
    const check = chalk.bold.green('✔︎  ');
    const minus = chalk.bold.red('- ');

    const log = (msg, ...msgs) => console.info(`${msg}`, ...msgs);
    log.warn = (msg, ...msgs) => console.warn(`WARN: ${msg}`, ...msgs);
    log.error = (msg, ...msgs) => console.error(`ERROR: ${msg}`, ...msgs);
    log.tag = (msg, ...msgs) => console.info(`${prefix}${msg}`, ...msgs);
    log.add = (msg, ...msgs) => console.info(`${check}${msg}`, ...msgs);
    log.remove = (msg, ...msgs) => console.info(`${minus}${msg}`, ...msgs);

    return log;
};
