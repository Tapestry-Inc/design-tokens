# Design Tokens

This project contains design tokens for Tapestry brands. Assets derived from these tokens are published as an NPM package to the Github Packages registry, as well as to a CDN.

Each brand's token documentation can be viewed at:

- Coach: https://assets.tapestry.com/ux/design-tokens/coach/index.html
- Stuart Weitzman: https://assets.tapestry.com/ux/design-tokens/stuart-weitzman/index.html

## Installation

### NPM

All brands are contained in a single package.
See the Github Package Registry requirements for [installing a package](https://docs.github.com/en/packages/learn-github-packages/installing-a-package) into your project.

```shell
npm install @tapestry-inc/design-tokens
```

Use the following path structure for importing files:

```
@tapestry-inc/design-tokens/<brand>/<file>
```

### CDN

All assets are available on a CDN. The current version for each brand is located in the root directory. You can also access a specific version by appending the version number as a directory to the root.

Root URL: https://assets.tapestry.com/ux/design-tokens

URL structure for the current version:

```
<root-url>/<brand>/<file>
```

URL structure for a specific version:

```
<root-url>/<x.x.x>/<brand>/<file>
```

## Usage

Each brand contains the same files. Directory/file naming conventions use [kebab-case](<https://en.wikipedia.org/wiki/Naming_convention_(programming)#Delimiter-separated_words>).

- `variables.css`/`_variables.scss`: CSS & SCSS variables.
- `custom-media.css: `[Custom media query variables](https://drafts.csswg.org/mediaqueries-5/#custom-mq)
- `font-face.css`: `@font-face` rules.
- `utilities.css`: A tiny set of utility classes based on the available tokens (~1K minified/gzipped).

## Development

Development within this codebase requires experience with the following tools:

- [Style Dictionary](https://amzn.github.io/style-dictionary/): Build system for design tokens.
- [PostCSS](https://postcss.org/): CSS transforming tool required by Tailwind CSS.
- [Tailwind CSS](https://tailwindcss.com/docs): PostCSS plugin for creating the custom CSS utilities.
- [Handlebars](https://handlebarsjs.com/): HTML templating system used for documentation site.
- [Semantic Release](https://semantic-release.gitbook.io/semantic-release/): Automates the version management and package publishing.
- [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions): GitHub's CI/CD automation tool.

### NPM Commands

- `npm run build`: Creates the needed files for the npm package.
- `npm run cdn`: Creates the needed files for CDN distribution. Depends on `npm run build`.

### Tokens

This is the core of this codebase, a collection of JSON files that organize each brand's styles into a semantic hierarchy. Everything one needs to know can be found in Style Dictionary's [documentation](https://amzn.github.io/style-dictionary/#/README).

#### Editing a Token

[ToDo]

#### Adding a New Category of Tokens

[ToDo]

### Publishing

The release process is managed by [Semantic Release](https://semantic-release.gitbook.io/semantic-release/). New releases are published based on the `<Type>` tag in the commit messages when a PR is merged into the `main` branch. See `release.config.js` for configuration.

#### Commit Message Conventions

This project adheres to the [ESLint commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-eslint#readme).

Commit message format: `<Tag>: <Message>`

Example commit message:

```
Breaking: Removed deprecated token.
```

Each commit message is linted with [`commitlint`](https://commitlint.js.org). See `commitlint.config.js` for configuration.
