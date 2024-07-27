import { hash } from 'argon2'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import { users } from '../src/schema'

export const seedUsers = async (db: PostgresJsDatabase<Record<string, never>>) => {
    await db.delete(users)

    await db.insert(users).values([
        {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: await hash('Hello1234!'),
        },
    ])
}
