import { db, users } from '@repo/db'
import { hashPassword, verifyPassword } from '@repo/lib'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { Context as HonoContext } from 'hono'

import { auth } from '../../../core/auth'
import { userErrors } from '../user.errors'
import { CreateUserInput, LoginUserInput } from '../user.schema'
import { checkUserExists } from '../user.utils'

export const getMeHandler = async ({ userId }: { userId: string }) => {
    const res = await db.select().from(users).where(eq(users.id, userId))
    return res[0] ?? null
}

export const registeHandler = async ({
    c,
    password,
    ...input
}: CreateUserInput & { c: HonoContext }) => {
    const userExists = await checkUserExists({ email: input.email })

    if (userExists) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
            message: userErrors.EMAIL_ALREADY_EXISTS,
        })
    }

    const res = await db
        .insert(users)
        .values({
            ...input,
            password: await hashPassword(password),
        })
        .returning({ id: users.id })
    const user = res[0]

    auth.setAccessToken({ c, userId: user.id })

    return {
        userId: user.id,
    }
}

export const loginHandler = async ({ c, ...input }: LoginUserInput & { c: HonoContext }) => {
    const userExists = await checkUserExists({ email: input.email })

    if (!userExists) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
            message: userErrors.INVALID_EMAIL_OR_PASSWORD,
        })
    }

    const res = await db.select().from(users).where(eq(users.email, input.email))
    const user = res[0]

    const isPasswordValid = await verifyPassword(user.password, input.password)

    if (!isPasswordValid) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
            message: userErrors.INVALID_EMAIL_OR_PASSWORD,
        })
    }

    auth.setAccessToken({ c, userId: user.id })

    return {
        userId: user.id,
    }
}

export const logoutHandler = async ({ c }: { c: HonoContext }) => {
    auth.deleteAccessToken({ c })
}
