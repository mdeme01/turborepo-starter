import { envConfig } from '@repo/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { seedUsers } from './users'

const connection = postgres(envConfig.postgres.url, { max: 1 })

const db = drizzle(connection)

const seed = async () => {
    console.log('Seeding database...')

    await seedUsers(db)

    console.log('Seed complete.')
}

seed()
    .then(() => connection.end())
    .catch((e) => console.error(e))
