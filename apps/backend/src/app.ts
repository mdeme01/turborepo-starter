import { trpcServer } from '@hono/trpc-server'
import { appRouter, createContext } from '@repo/api'
import { envConfig } from '@repo/env'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono()

app.use(logger())

app.use(
    '*',
    cors({
        origin: envConfig.web.url,
        credentials: true,
    }),
)

app.use(
    '/trpc/*',
    trpcServer({
        router: appRouter,
        createContext,
    }),
)

app.get('/', (c) => c.text('Hono server is running'))

export { app }
