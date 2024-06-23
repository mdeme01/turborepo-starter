import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react(), TanStackRouterVite()],
    server: {
        port: 4000,
        proxy: {
            '/api': {
                target: 'http://localhost:3000/trpc',
                changeOrigin: true,
            },
        },
    },
})
