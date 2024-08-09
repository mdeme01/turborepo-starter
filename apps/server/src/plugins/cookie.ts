import cookie from '@fastify/cookie'
import { envConfig } from '@repo/env'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

export default fp(async (fastify: FastifyInstance) => {
    fastify.register(cookie, {
        secret: envConfig.cookieSecret,
        parseOptions: {},
    })
})
