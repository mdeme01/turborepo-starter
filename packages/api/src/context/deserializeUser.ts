import { verifyJwt } from '@repo/utils'
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'

export const deserializeUser = async ({
    req,
}: CreateFastifyContextOptions): Promise<{
    id: string
} | null> => {
    const token = req.headers.cookie
        ?.split(';')
        .find((c) => c.trim().startsWith('auth-token='))
        ?.split('auth-token=')[1]

    if (!token) {
        return null
    }

    const user = verifyJwt(token)

    if (!user || !user.id) {
        return null
    }

    return {
        id: user.id,
    }
}
