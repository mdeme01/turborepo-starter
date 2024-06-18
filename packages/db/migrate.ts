import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const connection = postgres(process.env.POSTGRES_CONNECTION ?? '', { max: 1 })

const handleMigrate = async () => {
    await migrate(drizzle(connection), { migrationsFolder: './drizzle' })
}

handleMigrate()
    .then(() => connection.end())
    .catch((e) => console.error(e))
