import type { AppRouter } from '@repo/api'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `http://localhost:4000/api`,
        }),
    ],
})
