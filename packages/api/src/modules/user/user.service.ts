import { db, users } from '@repo/db'
import { hash } from 'argon2'
import { eq, ilike } from 'drizzle-orm'

import {
    CreateUserInput,
    DeleteUserInput,
    GetAllUsersInput,
    GetUserByIdInput,
    UpdateUserInput,
} from './user.schema'

export const createUserHandler = async ({ password, ...input }: CreateUserInput) => {
    return await db.insert(users).values([
        {
            ...input,
            password: await hash(password),
        },
    ])
}

export const getAllUsersHandler = async ({ name }: GetAllUsersInput) => {
    return await db
        .select()
        .from(users)
        .where(ilike(users.name, `%${name ?? ''}%`))
}

export const getUserByIdHandler = async ({ id }: GetUserByIdInput) => {
    return await db.select().from(users).where(eq(users.id, id))
}

export const updateUserHandler = async ({ id, password, ...input }: UpdateUserInput) => {
    return await db
        .update(users)
        .set({ ...input, password: password ? await hash(password) : undefined })
        .where(eq(users.id, id))
}

export const deleteUserHandler = async ({ id }: DeleteUserInput) => {
    return await db.delete(users).where(eq(users.id, id))
}
