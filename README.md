# Design Tokens

Tokens are a collection of JSON files that organize a [Tapestry's](https://www.tapestry.com/)brand's styles into a semantic hierarchy and enable generating multiple types of assets via [Style Dictionary](https://amzn.github.io/style-dictionary/#/README).

Assets derived from these tokens are published as an NPM package to the Github Packages Registry, as well as to a CDN.

Each brand's token documentation can be viewed at:

- Coach: <https://assets.tapestry.com/ux/design-tokens/coach/index.html>
- Stuart Weitzman: <https://assets.tapestry.com/ux/design-tokens/stuart-weitzman/index.html>

## Installation

### NPM

All brands are contained in a single package.
See the Github Package Registry requirements for [installing a package](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package) into your project.

```shell
npm install @tapestry-inc/design-tokens
```

Use the following path structure for importing files:

```
@tapestry-inc/design-tokens/<brand>/<file>
```

### CDN

The current version for each brand is located in the root directory. You can also access a specific version by appending the version number to the root as a directory.

Root URL: `https://assets.tapestry.com/ux/design-tokens`

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

For more info, read the docs on [adding new tokens](docs/adding-new-tokens.md) and the [development/release process](docs/development.md).
