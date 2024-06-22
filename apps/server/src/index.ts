import dotenv from 'dotenv'
import Fastify from 'fastify'

import { app } from './app'

dotenv.config({
    path: '../../../.env',
})

const host = process.env.SERVER_HOST ?? 'localhost'
const port = Number(process.env.SERVER_PORT ?? 3000)

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
