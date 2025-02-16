/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string
    readonly VITE_WEB_HOST: string
    readonly VITE_WEB_PORT: number
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
