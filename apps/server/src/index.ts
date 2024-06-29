import { envConfig } from '@repo/env'
import Fastify from 'fastify'

import { app } from './app'

const host = envConfig.server.host
const port = envConfig.server.port

const server = Fastify({
    logger: true,
})

server.register(app)

server.listen({ port, host }, (err) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    } else {
        console.log(`> Ready http://${host}:${port}`)
    }
})
