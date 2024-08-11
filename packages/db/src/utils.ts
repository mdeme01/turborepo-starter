import { nanoid } from '@repo/lib'
import { date, text } from 'drizzle-orm/pg-core'

export const defaultPgTableCols = {
    id: text('id').$defaultFn(nanoid).primaryKey().unique().notNull(),
    created_at: date('created_at').defaultNow().notNull(),
    updated_at: date('updated_at').defaultNow().notNull(),
}
