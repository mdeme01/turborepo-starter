const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:tailwindcss/recommended',
        'prettier',
        'turbo',
    ],
    plugins: [
        'only-warn',
        'react-refresh',
        'react',
        'react-hooks',
        'tailwindcss',
        'simple-import-sort',
    ],
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
    overrides: [
        {
            files: ['*.js?(x)', '*.ts?(x)'],
            rules: {
                'simple-import-sort/imports': 'warn',
                'simple-import-sort/exports': 'warn',
                'no-unused-vars': 'warn',
                '@typescript-eslint/no-explicit-any': 'warn',
                '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
                'tailwindcss/enforces-shorthand': 'off',
                'tailwindcss/no-custom-classname': 'off',
                'tailwindcss/classnames-order': 'off',
                'react/self-closing-comp': ['warn', { component: true, html: true }],
                'react/jsx-sort-props': [
                    'warn',
                    {
                        callbacksLast: true,
                        shorthandFirst: true,
                        shorthandLast: false,
                        multiline: 'ignore',
                        ignoreCase: false,
                        noSortAlphabetically: true,
                    },
                ],
            },
        },
    ],
}
