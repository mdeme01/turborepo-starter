import { db, users } from '@repo/db'
import { hashPassword } from '@repo/lib'
import { TRPCError } from '@trpc/server'
import { eq, ilike } from 'drizzle-orm'

import {
    CreateUserInput,
    DeleteUserInput,
    GetAllUsersInput,
    GetUserByIdInput,
    UpdateUserInput,
} from './user.schema'
import { checkUserExists } from './user.utils'

export const createUserHandler = async ({ password, ...input }: CreateUserInput) => {
    const userExists = await checkUserExists({ email: input.email })

    if (userExists) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User with this email already exists',
        })
    }

    const res = await db
        .insert(users)
        .values({
            ...input,
            password: await hashPassword(password),
        })
        .returning()

    return res[0]
}

export const getAllUsersHandler = async ({ name }: GetAllUsersInput) => {
    return await db
        .select()
        .from(users)
        .where(ilike(users.name, `%${name ?? ''}%`))
}

export const getUserByIdHandler = async ({ id }: GetUserByIdInput) => {
    const res = await db.select().from(users).where(eq(users.id, id))
    return res[0]
}

export const updateUserHandler = async ({ id, password, ...input }: UpdateUserInput) => {
    const res = await db
        .update(users)
        .set({ ...input, password: password ? await hashPassword(password) : undefined })
        .where(eq(users.id, id))
        .returning()

    return res[0]
}

export const deleteUserHandler = async ({ id }: DeleteUserInput) => {
    const res = await db.delete(users).where(eq(users.id, id)).returning()

    return res[0]
}
