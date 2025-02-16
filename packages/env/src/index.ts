import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path: path.resolve(__dirname, '../../../.env'),
})

export const envConfig = {
    isDev: process.env.NODE_ENV === 'development',
    postgres: {
        url: process.env.POSTGRES_DB_URL ?? 'postgresql://user:password@localhost:5432/db',
    },
    server: {
        url: process.env.SERVER_URL ?? 'http://localhost:3000',
        host: process.env.SERVER_HOST ?? 'localhost',
        port: Number(process.env.SERVER_PORT ?? 3000),
    },
    web: {
        url: process.env.VITE_WEB_URL ?? 'http://localhost:3001',
        host: process.env.VITE_WEB_HOST ?? 'localhost',
        port: Number(process.env.VITE_WEB_PORT ?? 3001),
    },
    cookieSecret: process.env.COOKIE_SECRET ?? 'cookie-secret',
    jwtSecret: process.env.JWT_SECRET ?? 'jwt-secret',
}
