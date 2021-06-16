/*
 * Configuration for generating the identity values of a token.
 * @example: Defaults
 * ```
 * {
 *   $category: {
 *     $type: {
 *
 *       // The token name's prefix. Defaults to the value of the `type` attribute.
 *       prefix: {string},
 *
 *       // Which CTI (category, type, item) attribute to start at when stringing together the name.
 *       // Options are 'category', 'type', or 'item'.
 *       // Defaults to 'item'.
 *       nameStart: {string},
 *
 *       // Which types of identifiers are exported.
 *       // Currently, `vars` is the only property and defaults to the props/values below.
 *       exports: {
 *         vars: {
 *           css: {boolean}, // true
 *           scss: {boolean}, // true
 *           '@custom-media': {boolean}, // false
 *         },
 *       },
 *      }
 *    }
 *  }
 * ```
 */
module.exports = {
    asset: {
        icon: {
            prefix: 'icon',
            nameStart: 'item',
            exports: {
                vars: false,
            },
        },
        logo: {
            prefix: 'logo',
            nameStart: 'item',
            exports: {
                vars: false,
            },
        },
    },
    color: {
        default: {
            prefix: 'color',
            nameStart: 'type',
        },
    },
    effect: {
        'box-shadow': {
            prefix: 'shadow',
        },
    },
    font: {
        face: {
            prefix: 'font',
            exports: {
                vars: false,
            },
        },
        family: {
            prefix: 'font',
        },
        track: {
            prefix: 'font',
            nameStart: 'type',
        },
    },
    size: {
        font: {
            prefix: 'text',
        },
    },
    utility: {
        typography: {
            exports: {
                vars: false,
            },
        },
    },
    viewport: {
        default: {
            prefix: 'viewport',
            nameStart: 'type',
            exports: {
                vars: {
                    scss: true,
                    '@custom-media': true,
                },
            },
        },
    },
};
