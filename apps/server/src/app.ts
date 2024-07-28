import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import { renderTrpcPanel } from '@metamorph/trpc-panel'
import { appRouter, createContext } from '@repo/api'
import { envConfig } from '@repo/env'
import { signJwt, verifyJwt } from '@repo/utils'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { FastifyInstance } from 'fastify'

const host = envConfig.server.host
const port = envConfig.server.port

const authTokenCookieName = 'auth-token'

export const app = async (fastify: FastifyInstance) => {
    await fastify.register(cookie, {
        secret: envConfig.cookieSecret,
        parseOptions: {},
    })

    await fastify.register(cors, {
        origin: `${envConfig.web.url}`,
        methods: ['GET', 'POST', 'DELETE'],
        credentials: true,
    })

    await fastify.register(fastifyTRPCPlugin, {
        prefix: '/trpc',
        trpcOptions: {
            router: appRouter,
            createContext,
        },
    })

    fastify.get('/', (_, reply) => {
        return reply.type('text/html').send('Turborepo server is running.')
    })

    fastify.get('/panel', (_, reply) => {
        return reply.type('text/html').send(
            renderTrpcPanel(appRouter, {
                url: `http://${host}:${port}/trpc`,
                transformer: 'superjson',
            }),
        )
    })

    fastify.post('/token', async (request, reply) => {
        const { userId } = JSON.parse(request.body as string) as { userId: string }

        const token = signJwt({ id: userId })

        reply.setCookie(authTokenCookieName, token, {
            path: '/',
            sameSite: envConfig.isDev ? 'lax' : 'none',
            secure: !envConfig.isDev,
            httpOnly: true,
            signed: false,
        })
    })

    fastify.get('/token', async (request, reply) => {
        const token = request.cookies[authTokenCookieName]

        const user = verifyJwt(token ?? '')

        return reply.status(200).send({ authed: user !== null })
    })

    fastify.delete('/token', async (request, reply) => {
        reply.clearCookie(authTokenCookieName)
    })
}
