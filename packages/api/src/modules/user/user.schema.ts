import { z } from 'zod'

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
})

export const getAllUsersSchema = z.object({
    name: z.string().optional(),
})

export const getUserByIdSchema = z.object({
    id: z.string(),
})

export const updateUserSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    password: z.string().optional(),
})

export const deleteUserSchema = z.object({
    id: z.string(),
})

export type LoginUserInput = z.infer<typeof loginUserSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type GetAllUsersInput = z.infer<typeof getAllUsersSchema>
export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type DeleteUserInput = z.infer<typeof deleteUserSchema>
