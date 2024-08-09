import { appRouter, createContext } from '@repo/api'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

export default fp(async (fastify: FastifyInstance) => {
    fastify.register(fastifyTRPCPlugin, {
        prefix: '/trpc',
        trpcOptions: {
            router: appRouter,
            createContext,
        },
    })
})
