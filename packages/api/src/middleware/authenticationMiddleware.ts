import { TRPCError } from '@trpc/server'

import { middleware } from '../core/baseRouter'

export const authenticationMiddleware = () => {
    return middleware(({ next, ctx }) => {
        if (!ctx.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' })
        }
        return next({ ctx })
    })
}
