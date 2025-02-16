import { authenticationProcedure, publicProcedure, router } from '../../../core/baseRouter'
import { createUserSchema, loginUserSchema } from '../user.schema'
import { getMeHandler, loginHandler, logoutHandler, registeHandler } from './auth.service'

export const authRouter = router({
    getMe: publicProcedure.query(({ ctx }) => getMeHandler({ userId: ctx.user?.id ?? '' })),
    register: publicProcedure
        .input(createUserSchema)
        .mutation(({ ctx, input }) => registeHandler({ c: ctx.c, ...input })),
    login: publicProcedure
        .input(loginUserSchema)
        .mutation(({ ctx, input }) => loginHandler({ c: ctx.c, ...input })),
    logout: authenticationProcedure.mutation(({ ctx }) => logoutHandler({ c: ctx.c })),
})
