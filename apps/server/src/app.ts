import { appRouter } from '@repo/api'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import dotenv from 'dotenv'
import { FastifyInstance } from 'fastify'
import { renderTrpcPanel } from 'trpc-panel'

dotenv.config({
    path: '../../../.env',
})

const host = process.env.SERVER_HOST ?? 'localhost'
const port = Number(process.env.SERVER_PORT ?? 3000)

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
            }),
        )
    })
}
