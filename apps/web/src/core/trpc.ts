import type { AppRouter } from '@repo/api'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { createTRPCReact, httpLink } from '@trpc/react-query'
import superjson from 'superjson'

const errorHandler = (error: unknown) => {
    console.error(error)
}

export const api = createTRPCReact<AppRouter>()

export const trpcClient = api.createClient({
    transformer: superjson,
    links: [
        httpLink({
            url: 'api/trpc',
        }),
    ],
})

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchInterval: 60000,
        },
    },
    queryCache: new QueryCache({
        onError: errorHandler,
    }),
    mutationCache: new MutationCache({
        onError: errorHandler,
    }),
})
