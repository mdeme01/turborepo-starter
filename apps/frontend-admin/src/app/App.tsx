import { ThemeProvider } from '@repo/web-ui'

import { ApiProvider } from '../providers/ApiProvider'
import { AuthProvider } from '../providers/AuthProvider'
import { RouterProvider } from '../providers/RouterProvider'

export const App = () => {
    return (
        <ApiProvider>
            <AuthProvider>
                <ThemeProvider>
                    <RouterProvider />
                </ThemeProvider>
            </AuthProvider>
        </ApiProvider>
    )
}
