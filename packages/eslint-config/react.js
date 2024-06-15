const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
        'turbo',
    ],
    plugins: ['only-warn', 'react-refresh'],
    globals: {
        React: true,
        JSX: true,
    },
    env: {
        node: true,
        browser: true,
        es2020: true,
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
    overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
}
