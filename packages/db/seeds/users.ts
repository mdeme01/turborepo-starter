import { hashPassword } from '@repo/lib'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import { users } from '../src/schema'

export const seedUsers = async (db: PostgresJsDatabase<Record<string, never>>) => {
    await db.delete(users)

    await db.insert(users).values([
        {
            name: 'Admin User',
            email: 'admin@admin.com',
            password: await hashPassword('Hello1234!'),
        },
    ])
}
