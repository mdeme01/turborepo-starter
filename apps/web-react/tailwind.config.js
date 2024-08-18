/** @type {import('tailwindcss').Config} */
export default {
    presets: [require('@repo/tailwind')],
    content: ['./src/**/*.{ts,tsx}', 'index.html', '../../packages/web-ui/src/**/*.{ts,tsx}'],
}
