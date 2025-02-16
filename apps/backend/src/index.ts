import { serve } from '@hono/node-server'
import { envConfig } from '@repo/env'

import { app } from './app'

const host = envConfig.server.host
const port = envConfig.server.port

serve({
    fetch: app.fetch,
    hostname: host,
    port,
})
