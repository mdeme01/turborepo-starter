import dotenv from 'dotenv'

dotenv.config({
    path: '../../../.env',
})

export const envConfig = {
    postgres: {
        url: process.env.POSTGRES_URL ?? 'postgresql://user:password@localhost:5432/db',
        host: process.env.POSTGRES_HOST ?? 'localhost',
        port: Number(process.env.POSTGRES_PORT ?? 5432),
        db: process.env.POSTGRES_DB ?? 'db',
        user: process.env.POSTGRES_USER ?? 'user',
        password: process.env.POSTGRES_PASSWORD ?? 'password',
    },
    server: {
        url: process.env.SERVER_URL ?? 'http://localhost:3000',
        host: process.env.SERVER_HOST ?? 'localhost',
        port: Number(process.env.SERVER_PORT ?? 3000),
    },
}
