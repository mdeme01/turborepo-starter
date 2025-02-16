import { authenticationProcedure, router } from '../../core/baseRouter'
import { authRouter } from './auth/auth.router'
import {
    createUserSchema,
    deleteUserSchema,
    getAllUsersSchema,
    getUserByIdSchema,
    updateUserSchema,
} from './user.schema'
import {
    createUserHandler,
    deleteUserHandler,
    getAllUsersHandler,
    getUserByIdHandler,
    updateUserHandler,
} from './user.service'

export const userRouter = router({
    auth: authRouter,
    create: authenticationProcedure
        .input(createUserSchema)
        .mutation(({ input }) => createUserHandler(input)),
    getAll: authenticationProcedure
        .input(getAllUsersSchema)
        .query(({ input }) => getAllUsersHandler(input)),
    getById: authenticationProcedure
        .input(getUserByIdSchema)
        .query(({ input }) => getUserByIdHandler(input)),
    update: authenticationProcedure
        .input(updateUserSchema)
        .mutation(({ input }) => updateUserHandler(input)),
    delete: authenticationProcedure
        .input(deleteUserSchema)
        .mutation(({ input }) => deleteUserHandler(input)),
})
