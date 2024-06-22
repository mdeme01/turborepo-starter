import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { seedUsers } from './users'

dotenv.config({
    path: '../../.env',
})

const connectionString =
    process.env.POSTGRES_CONNECTION ?? 'postgresql://user:password@localhost:5432/db'

const connection = postgres(connectionString, { max: 1 })

const db = drizzle(connection)

const seed = async () => {
    console.log('Seeding database...')

    await seedUsers(db)

    console.log('Seed complete.')
}

seed()
    .then(() => connection.end())
    .catch((e) => console.error(e))
