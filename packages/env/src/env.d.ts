declare namespace NodeJS {
    interface ProcessEnv {
        POSTGRES_URL: string
        POSTGRES_HOST: string
        POSTGRES_PORT: number
        POSTGRES_DB: string
        POSTGRES_USER: string
        POSTGRES_PASSWORD: string
        SERVER_URL: string
        SERVER_HOST: string
        SERVER_PORT: number
        WEB_URL: string
        WEB_HOST: string
        WEB_PORT: number
    }
}
