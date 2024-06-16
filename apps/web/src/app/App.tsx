import { ThemeProvider } from '@repo/ui'

import { Router } from './Router'

export const App = () => {
    return (
        <ThemeProvider>
            <Router />
        </ThemeProvider>
    )
}
