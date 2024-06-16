import { ThemeProvider, ThemeToggle } from '@repo/ui'

export const App = () => {
    return (
        <ThemeProvider>
            <div className="flex h-screen items-center justify-center">
                <ThemeToggle />
            </div>
        </ThemeProvider>
    )
}
