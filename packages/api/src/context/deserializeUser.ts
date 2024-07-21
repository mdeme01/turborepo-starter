import { verifyJwt } from '@repo/utils'
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'

export const deserializeUser = async ({
    req,
}: CreateFastifyContextOptions): Promise<{
    id: string
} | null> => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return null
    }

    const token = authHeader.split(' ')[1]
    const user = verifyJwt(token)

    if (!user) {
        return null
    }

    return {
        id: user.id,
    }
}
