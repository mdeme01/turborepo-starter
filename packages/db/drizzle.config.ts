import { envConfig } from '@repo/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/schema.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: envConfig.postgres.url,
    },
})
