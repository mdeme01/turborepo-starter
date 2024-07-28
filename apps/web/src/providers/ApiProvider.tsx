import { QueryClientProvider } from '@tanstack/react-query'

import { api, queryClient, trpcClient } from '../core/trpc'

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </api.Provider>
    )
}
