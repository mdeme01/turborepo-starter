import { envConfig } from '@repo/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(envConfig.postgres.connection)

export const db = drizzle(client)
