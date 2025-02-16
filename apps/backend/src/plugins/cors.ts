import cors from '@fastify/cors'
import { envConfig } from '@repo/env'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

export default fp(async (fastify: FastifyInstance) => {
    fastify.register(cors, {
        origin: `${envConfig.web.url}`,
        methods: ['GET', 'POST', 'DELETE'],
        credentials: true,
    })
})
