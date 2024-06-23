const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'turbo'],
    plugins: ['only-warn', 'simple-import-sort'],
    globals: {
        React: true,
        JSX: true,
    },
    env: {
        node: true,
    },
    settings: {
        'import/resolver': {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: [
        // Ignore dotfiles
        '.*.js',
        'node_modules/',
        'dist/',
    ],
    overrides: [
        {
            files: ['*.js?(x)', '*.ts?(x)'],
            rules: {
                'simple-import-sort/imports': 'warn',
                'simple-import-sort/exports': 'warn',
                'no-unused-vars': 'warn',
                '@typescript-eslint/no-explicit-any': 'warn',
                '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            },
        },
    ],
}
