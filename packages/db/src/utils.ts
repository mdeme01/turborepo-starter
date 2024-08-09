import { date, uuid } from 'drizzle-orm/pg-core'

export const defaultPgTableCols = {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    created_at: date('created_at').defaultNow().notNull(),
    updated_at: date('updated_at').defaultNow().notNull(),
}
