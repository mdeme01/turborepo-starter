/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('@repo/tailwind')],
    content: ['./src/**/*.{ts,tsx}', 'index.html', '../../packages/ui/src/**/*.{ts,tsx}'],
}
