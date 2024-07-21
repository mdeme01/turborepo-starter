import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'

import { deserializeUser } from './deserializeUser'

export const createContext = async (param: CreateFastifyContextOptions) => {
    const user = await deserializeUser(param)

    return {
        user,
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>
