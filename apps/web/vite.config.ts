import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
})

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())

    return {
        plugins: [react(), TanStackRouterVite()],
        server: {
            port: Number(env.VITE_WEB_PORT),
            host: env.VITE_WEB_HOST,
        },
    }
})
