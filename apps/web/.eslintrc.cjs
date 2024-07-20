const path = require('path')

/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ['@repo/eslint-config/eslint.react.js'],
    parser: '@typescript-eslint/parser',
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    settings: {
        tailwindcss: {
            config: path.join(__dirname, './tailwind.config.js'),
        },
    },
}
