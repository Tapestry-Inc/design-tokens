module.exports = {
    dryRun: true,
    branches: ['main'],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'eslint',
                releaseRules: [
                    { tag: 'Breaking', release: 'major' },
                    { tag: 'New', release: 'minor' },
                    { tag: 'Update', release: 'minor' },
                    { tag: 'Fix', release: 'patch' },
                ],
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'eslint',
                parserOpts: {
                    noteKeywords: ['Breaking'],
                },
                writerOpts: {
                    debug: (args) => console.log(args),
                },
            },
        ],
        [
            '@semantic-release/npm',
            {
                pkgRoot: './build',
            },
        ],
    ],
};
