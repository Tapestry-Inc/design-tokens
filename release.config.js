const { readFileSync } = require('fs-extra');
const { paths } = require('./constants');

// https://semantic-release.gitbook.io/semantic-release/usage/configuration
// Dry Run: `NPM_TOKEN=blah npx semantic-release --dry-run`
module.exports = {
    branches: ['main', { name: 'next', prerelease: true }],
    plugins: [
        [
            // https://github.com/semantic-release/commit-analyzer#readme
            '@semantic-release/commit-analyzer',
            {
                // https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-eslint#readme
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
            // https://github.com/semantic-release/release-notes-generator#readme
            '@semantic-release/release-notes-generator',
            {
                preset: 'eslint',
                parserOpts: {
                    noteKeywords: ['Breaking'],
                },
                // https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-writer#options
                writerOpts: {
                    // debug: (args) => console.log(args),
                    groupBy: false,
                    repoUrl: 'https://github.com/Tapestry-Inc/design-tokens/',
                    headerPartial: readFileSync(
                        `${paths.scripts.changelog}header.hbs`,
                        'utf8'
                    ),
                    commitPartial: readFileSync(
                        `${paths.scripts.changelog}commit.hbs`,
                        'utf8'
                    ),
                    partials: {
                        'short-hash': readFileSync(
                            `${paths.scripts.changelog}short-hash.hbs`,
                            'utf8'
                        ),
                        references: readFileSync(
                            `${paths.scripts.changelog}references.hbs`,
                            'utf8'
                        ),
                    },
                    transform: (commit) => {
                        const ignore = ['Upgrade', 'Docs', 'Build', 'Chore'];

                        commit.changelog = { ...commit.changelog };
                        commit.changelog.ignore = ignore.includes(commit.tag);

                        return commit;
                    },
                },
            },
        ],
        [
            // https://github.com/semantic-release/changelog#readme
            '@semantic-release/changelog',
            {
                changelogTitle: '# Changelog | Tapestry Design Tokens',
                changelogFile: './build/CHANGELOG.md',
            },
        ],
        [
            // https://github.com/semantic-release/changelog#readme
            '@semantic-release/changelog',
            {
                changelogTitle: '# Changelog | Tapestry Design Tokens',
                changelogFile: 'CHANGELOG.md',
            },
        ],
        [
            // https://github.com/semantic-release/npm#readme
            '@semantic-release/npm',
            {
                pkgRoot: './build',
            },
        ],
        [
            // https://github.com/semantic-release/git#readme
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md'],
                message: 'Chore: Release v${nextRelease.version} [skip ci]',
            },
        ],
    ],
};
