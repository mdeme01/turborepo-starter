/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ['@repo/eslint-config/eslint.base.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
}
