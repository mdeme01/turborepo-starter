import { db, users } from '@repo/db'
import { eq } from 'drizzle-orm'

export const checkUserExists = async ({ email }: { email: string }) => {
    const res = await db.select().from(users).where(eq(users.email, email))
    return res.length > 0
}
