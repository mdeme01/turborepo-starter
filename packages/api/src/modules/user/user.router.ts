import { publicProcedure, router } from '../../core/baseRouter'
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
    create: publicProcedure
        .input(createUserSchema)
        .mutation(({ input }) => createUserHandler(input)),
    getAll: publicProcedure
        .input(getAllUsersSchema)
        .query(({ input }) => getAllUsersHandler(input)),
    getById: publicProcedure
        .input(getUserByIdSchema)
        .query(({ input }) => getUserByIdHandler(input)),
    update: publicProcedure
        .input(updateUserSchema)
        .mutation(({ input }) => updateUserHandler(input)),
    delete: publicProcedure
        .input(deleteUserSchema)
        .mutation(({ input }) => deleteUserHandler(input)),
})
