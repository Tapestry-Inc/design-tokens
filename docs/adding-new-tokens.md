# Adding New Tokens

## New Brands or Themes

### Brands

To add a new brand is as simple as duplicating the directory of another brand and then making edits.

## Themes

Similar to adding a new brand, adding another theme to a brand can be done by duplicating the brand's `default` theme and then editing.

The build process will locate all of a brand's non-default theme's in the `themes` directory. For example, importing the `variables.css` file from a hypothetical theme named `summer` would look like the following:

```css
@import url(<brand>/themes/summer/variables.css);
```

## Individual Tokens

Tokens are classified using the `category`, `type`, and `item` (CTI) nomenclature. See Style Dictionary's [CTI documentation](https://amzn.github.io/style-dictionary/#/tokens?id=category-type-item) for more information.

Adding to existing set of tokens, for example: another color or font, is straight forward, since the `category` and `type` already exist. Adding a **new** `type` or `category` may require updates to configurations and adding examples to the generated documentation.

Along with exporting source code (CSS, SCSS, JavaScript, etc.), properties files (metadata) are also created for all tokens and utilities that are used for generating documentation.

- `build/properties/index.js`: All tokens (not CSS utility classes), regardless of how (or if) they are exported as source code.
- `build/properties/<type>.js`: Only tokens and CSS utility classes that get exported as source code.

## General Steps

### JSON

Add a new `.json` file to the proper directory. If the tokens are the same for all brands, add them to `src/global`, otherwise they should be added to `src/brands/<brand>`

- The parent folder of the new JSON file should named the same as the token's `category`.
- The JSON file should be named the same as the token's `item`.

### Style Dictionary

Depending on the desired naming convention and in what form the token will be exported, additions and/or adjustments to the actions/filters/formats/transforms may be needed.

- `scripts/style-dictionary/config.js`: Each new token `type` will need to be added to the `Token properties` section so its metadata will be available for generating documentation.
- `scripts/style-dictionary/identity.config.js`: Controls the token's naming convention and identifier metadata required for generating the documentation.

### Tailwind

To make the token available as a utility class (if compatible), the following files may need to be updated:

- `scripts/tailwind/config.js`: Controls which utilities are generated.
- `scripts/tailwind/selector-map.js`: Controls the identifier metadata for each utility when creating the utility property file.

### Documentation Examples

Add the entry into the docs, with an example.

- `scripts/docs/index.js`: Combines all the token/utility/SVG data into an object consumed by Handlebars.js and generates the HTML.
- `scripts/docs/page.hbs`: The base HTML template.
- `scripts/docs/partials/examples/<type>.hbs`: The HTML used for token/utility/SVG examples.

## General QA Process

Each brand's assets are generated into its respective `build/<brand>` directory. Each brand should contain the same file types.

After adding a new token, check each brand's build directory to determine:

1. If the token values get transformed correctly?
2. If the tokens get exported into the proper files?
3. If the docs show the tokens correctly and without duplication?
