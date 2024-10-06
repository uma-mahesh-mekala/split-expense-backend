const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const globals = require('globals');
const babelParser = require('@babel/eslint-parser');

// Initialize the FlatCompat class
const compat = new FlatCompat({
    baseDirectory: __dirname, // Adjust to the root directory of your project
    recommendedConfig: js.configs.recommended,
});

module.exports = [
    {
        ignores: ['node_modules/', 'dist/**'],
    },
    {
        languageOptions: {
            sourceType: 'module',
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false, // Allows parsing without a babel.config.js
                ecmaVersion: 2020, // Specify ECMAScript version
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
        },
    },
    // mimic environments
    ...compat.env({
        es2020: true,
        node: true,
    }),

    ...compat.extends(
        'plugin:sonarjs/recommended-legacy',
        'plugin:prettier/recommended'
    ),

    ...compat.plugins('sonarjs'),

    {
        rules: {
            'no-unused-vars': 'error',
            'prefer-const': 'error',
            'no-console': 'error',
            indent: ['error', 4],
            'prettier/prettier': ['error', { semi: true }],
        },
    },
];
