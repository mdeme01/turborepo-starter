import { appRouter } from '@repo/api'
import { envConfig } from '@repo/env-config'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { FastifyInstance } from 'fastify'
import { renderTrpcPanel } from 'trpc-panel'

const host = envConfig.server.host
const port = envConfig.server.port

export const app = async (fastify: FastifyInstance) => {
    fastify.register(fastifyTRPCPlugin, {
        prefix: '/trpc',
        trpcOptions: {
            router: appRouter,
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
}
