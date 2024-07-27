import { date, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    created_at: date('created_at').defaultNow().notNull(),
    updated_at: date('updated_at').defaultNow().notNull(),

    email: text('email').unique().notNull(),
    name: text('name').notNull(),
    password: text('password').notNull(),
})
