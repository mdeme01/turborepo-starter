import { envConfig } from '@repo/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const connection = postgres(envConfig.postgres.connection, { max: 1 })

const handleMigrate = async () => {
    await migrate(drizzle(connection), { migrationsFolder: './migrations' })
}

handleMigrate()
    .then(() => connection.end())
    .catch((e) => console.error(e))
