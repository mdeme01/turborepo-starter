import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

dotenv.config({
    path: '../../../.env',
})

const connectionString =
    process.env.POSTGRES_CONNECTION ?? 'postgresql://user:password@localhost:5432/db'

const client = postgres(connectionString)

export const db = drizzle(client)
