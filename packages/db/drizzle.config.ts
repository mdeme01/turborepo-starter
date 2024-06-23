import { envConfig } from '@repo/env-config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/schema.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        host: envConfig.postgres.host,
        port: envConfig.postgres.port,
        user: envConfig.postgres.user,
        password: envConfig.postgres.password,
        database: envConfig.postgres.db,
    },
})
