import { ThemeProvider } from '@repo/ui'
import { QueryClientProvider } from '@tanstack/react-query'

import { api, queryClient, trpcClient } from '../core/trpc'
import { Router } from './Router'

export const App = () => {
    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Router />
                </ThemeProvider>
            </QueryClientProvider>
        </api.Provider>
    )
}
