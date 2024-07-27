import { db, users } from '@repo/db'
import { signJwt } from '@repo/utils'
import { TRPCError } from '@trpc/server'
import { hash, verify } from 'argon2'
import { eq, ilike } from 'drizzle-orm'

import { userErrors } from './user.errors'
import {
    CreateUserInput,
    DeleteUserInput,
    GetAllUsersInput,
    GetUserByIdInput,
    LoginUserInput,
    UpdateUserInput,
} from './user.schema'
import { checkUserExists } from './user.utils'

export const registerUserHandler = async ({ password, ...input }: CreateUserInput) => {
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
            password: await hash(password),
        })
        .returning({ id: users.id })

    return {
        jwt: signJwt({ id: res[0].id }),
    }
}

export const loginUserHandler = async (input: LoginUserInput) => {
    const userExists = await checkUserExists({ email: input.email })

    if (!userExists) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
            message: userErrors.EMAIL_DOES_NOT_EXIST,
        })
    }

    const res = await db.select().from(users).where(eq(users.email, input.email))
    const user = res[0]

    const isPasswordValid = await verify(user.password, input.password)

    if (!isPasswordValid) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
            message: userErrors.INVALID_PASSWORD,
        })
    }

    return {
        jwt: signJwt({ id: user.id }),
    }
}

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
            password: await hash(password),
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
    return await db.select().from(users).where(eq(users.id, id))
}

export const updateUserHandler = async ({ id, password, ...input }: UpdateUserInput) => {
    const res = await db
        .update(users)
        .set({ ...input, password: password ? await hash(password) : undefined })
        .where(eq(users.id, id))
        .returning()

    return res[0]
}

export const deleteUserHandler = async ({ id }: DeleteUserInput) => {
    const res = await db.delete(users).where(eq(users.id, id)).returning()

    return res[0]
}
