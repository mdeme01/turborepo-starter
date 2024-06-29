/** @type {import('tailwindcss').Config} */
export default {
    presets: [require('@repo/tailwind')],
    content: ['./src/**/*.{ts,tsx}', 'index.html', '../../packages/ui/src/**/*.{ts,tsx}'],
}
