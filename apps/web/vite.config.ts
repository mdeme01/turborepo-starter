import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { defineConfig, loadEnv } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

dotenv.config({
    path: '../../.env',
})

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [react(), TanStackRouterVite(), nodePolyfills()],
        server: {
            port: Number(env.VITE_WEB_PORT),
            host: env.VITE_WEB_HOST,
        },
    }
})
