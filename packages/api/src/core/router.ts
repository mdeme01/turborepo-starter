import { userRouter } from '../modules/user/user.router'
import { router } from './baseRouter'

export const appRouter = router({
    user: userRouter,
})

export type AppRouter = typeof appRouter
