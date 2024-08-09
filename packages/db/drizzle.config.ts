import { envConfig } from '@repo/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/schema',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: envConfig.postgres.url,
    },
})
