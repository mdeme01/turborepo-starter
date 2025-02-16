import autoload from '@fastify/autoload'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import path from 'path'

type AppOptions = FastifyPluginOptions & {
    opts: unknown
}

export const app = async (fastify: FastifyInstance, options: AppOptions) => {
    await fastify.register(autoload, {
        dir: path.join(__dirname, 'plugins'),
        options,
    })

    await fastify.register(autoload, {
        dir: path.join(__dirname, 'routes'),
        options,
    })
}
