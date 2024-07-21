import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

import { Context } from '../context/createContext'
import { authenticationMiddleware } from '../middleware/authenticationMiddleware'

const t = initTRPC.context<Context>().create({
    transformer: superjson,
})

export const router = t.router
export const middleware = t.middleware

export const publicProcedure = t.procedure
export const authenticationProdedure = publicProcedure.use(authenticationMiddleware())
