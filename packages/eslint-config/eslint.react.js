const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: [
        './eslint.base.js',
        'plugin:react-hooks/recommended',
        'plugin:tailwindcss/recommended',
    ],
    plugins: ['react', 'react-refresh', 'react-hooks', 'tailwindcss'],
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
    ignorePatterns: ['.*.js', 'node_modules/', 'dist/'],
    overrides: [
        {
            files: ['*.ts?(x)'],
            rules: {
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
