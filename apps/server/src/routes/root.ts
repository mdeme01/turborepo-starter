import { FastifyInstance } from 'fastify'

export default async (fastify: FastifyInstance) => {
    fastify.get('/', (_, reply) => {
        return reply.type('text/html').send('Turborepo server is running.')
    })
}
