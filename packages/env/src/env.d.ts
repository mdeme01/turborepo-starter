declare namespace NodeJS {
    interface ProcessEnv {
        POSTGRES_URL: string
        SERVER_URL: string
        SERVER_HOST: string
        SERVER_PORT: number
        VITE_WEB_URL: string
        VITE_WEB_HOST: string
        VITE_WEB_PORT: number
        COOKIE_SECRET: string
        JWT_SECRET: string
    }
}
