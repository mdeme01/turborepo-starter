import dotenv from 'dotenv'

dotenv.config({
    path: '../../../.env',
})

export const envConfig = {
    postgres: {
        url: process.env.POSTGRES_URL ?? 'postgresql://user:password@localhost:5432/db',
    },
    server: {
        url: process.env.SERVER_URL ?? 'http://localhost:3000',
        host: process.env.SERVER_HOST ?? 'localhost',
        port: Number(process.env.SERVER_PORT ?? 3000),
    },
    jwtSecret: process.env.JWT_SECRET ?? 'secret',
}
