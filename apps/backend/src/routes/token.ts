import { envConfig } from '@repo/env'
import { signJwt, verifyJwt } from '@repo/lib'
import { FastifyInstance } from 'fastify'

const authTokenCookieName = 'auth-token'

export default async (fastify: FastifyInstance) => {
    fastify.post('/token', async (request, reply) => {
        const { userId } = JSON.parse(request.body as string) as { userId: string }

        const token = signJwt({ id: userId })

        reply.setCookie(authTokenCookieName, token, {
            path: '/',
            sameSite: envConfig.isDev ? 'lax' : 'none',
            secure: !envConfig.isDev,
            httpOnly: true,
        })
    })

    fastify.get('/token', async (request, reply) => {
        const token = request.cookies[authTokenCookieName]

        const user = verifyJwt(token ?? '')

        return reply.status(200).send({ authed: user !== null })
    })

    fastify.delete('/token', async (_request, reply) => {
        reply.clearCookie(authTokenCookieName)
    })
}
