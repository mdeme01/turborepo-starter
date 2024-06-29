const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'turbo'],
    plugins: ['only-warn', 'simple-import-sort'],
    parser: '@typescript-eslint/parser',
    settings: {
        'import/resolver': {
            typescript: {
                project,
            },
        },
    },
    env: {
        node: true,
    },
    ignorePatterns: ['.*.js', 'node_modules/', 'dist/'],
    overrides: [
        {
            files: ['*.ts?(x)'],
            rules: {
                '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
                '@typescript-eslint/no-explicit-any': 'warn',
                'simple-import-sort/imports': 'warn',
                'simple-import-sort/exports': 'warn',
                'no-unused-vars': 'warn',
            },
        },
    ],
}
