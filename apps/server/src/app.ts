import cors from '@fastify/cors'
import { renderTrpcPanel } from '@metamorph/trpc-panel'
import { appRouter, createContext } from '@repo/api'
import { envConfig } from '@repo/env'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { FastifyInstance } from 'fastify'

const host = envConfig.server.host
const port = envConfig.server.port

export const app = async (fastify: FastifyInstance) => {
    await fastify.register(cors, {
        origin: '*',
        methods: '*',
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
}
