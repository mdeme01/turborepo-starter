import { pgTable, text } from 'drizzle-orm/pg-core'

import { defaultPgTableCols } from '../utils'

export const users = pgTable('users', {
    ...defaultPgTableCols,

    email: text('email').unique().notNull(),
    name: text('name').notNull(),
    password: text('password').notNull(),
})
