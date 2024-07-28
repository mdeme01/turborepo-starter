import { authenticationProcedure, publicProcedure, router } from '../../core/baseRouter'
import {
    createUserSchema,
    deleteUserSchema,
    getAllUsersSchema,
    getUserByIdSchema,
    loginUserSchema,
    updateUserSchema,
} from './user.schema'
import {
    createUserHandler,
    deleteUserHandler,
    getAllUsersHandler,
    getUserByIdHandler,
    loginUserHandler,
    registerUserHandler,
    updateUserHandler,
} from './user.service'

export const userRouter = router({
    register: publicProcedure
        .input(createUserSchema)
        .mutation(({ input }) => registerUserHandler(input)),
    login: publicProcedure.input(loginUserSchema).mutation(({ input }) => loginUserHandler(input)),
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
