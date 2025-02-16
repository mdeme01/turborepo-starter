import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { Context as HonoContext } from 'hono'

import { auth, UserContext } from '../core/auth'

export type Context = {
    user: UserContext | null
    c: HonoContext
}

export const createContext = async (
    _opts: FetchCreateContextFnOptions,
    c: HonoContext,
): Promise<Context> => {
    const user = await auth.deserializeUser({ c })
    return { user, c }
}
