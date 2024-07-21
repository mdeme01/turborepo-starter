declare namespace NodeJS {
    interface ProcessEnv {
        POSTGRES_URL: string
        SERVER_URL: string
        SERVER_HOST: string
        SERVER_PORT: number
    }
}
