import { ThemeProvider } from '@repo/ui'

import { ApiProvider } from '../providers/ApiProvider'
import { AuthProvider } from '../providers/AuthProvider'
import { Router } from './Router'

export const App = () => {
    return (
        <ApiProvider>
            <AuthProvider>
                <ThemeProvider>
                    <Router />
                </ThemeProvider>
            </AuthProvider>
        </ApiProvider>
    )
}
