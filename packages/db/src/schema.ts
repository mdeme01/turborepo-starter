import { date, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    created_at: date('created_at').defaultNow(),
    updated_at: date('updated_at').defaultNow(),
    name: text('name'),
    password: text('password'),
})
