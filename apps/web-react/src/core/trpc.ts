import type { AppRouter } from '@repo/api'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { createTRPCReact, httpBatchLink, TRPCClientError } from '@trpc/react-query'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import superjson from 'superjson'

const errorHandler = (error: unknown) => {
    console.error(error)
}

export const isTRPCError = (error: unknown): error is TRPCClientError<AppRouter> => {
    return error instanceof TRPCClientError
}

export type TRPCRouterInput = inferRouterInputs<AppRouter>
export type TRPCRouterOutput = inferRouterOutputs<AppRouter>

export const api = createTRPCReact<AppRouter>()

export const trpcClient = api.createClient({
    links: [
        httpBatchLink({
            url: `${import.meta.env.VITE_SERVER_URL}/trpc`,
            transformer: superjson,
            fetch(url, options) {
                return fetch(url, {
                    ...options,
                    credentials: 'include',
                })
            },
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
