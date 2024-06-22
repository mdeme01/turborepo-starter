import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

dotenv.config({
    path: '../../.env',
})

const connectionString =
    process.env.POSTGRES_CONNECTION ?? 'postgresql://user:password@localhost:5432/db'

const connection = postgres(connectionString, { max: 1 })

const handleMigrate = async () => {
    await migrate(drizzle(connection), { migrationsFolder: './migrations' })
}

handleMigrate()
    .then(() => connection.end())
    .catch((e) => console.error(e))
