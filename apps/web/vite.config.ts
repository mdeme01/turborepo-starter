import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react(), TanStackRouterVite()],
    server: {
        port: 4000,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
