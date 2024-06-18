import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(process.env.POSTGRES_CONNECTION ?? '')

export const db = drizzle(client)
