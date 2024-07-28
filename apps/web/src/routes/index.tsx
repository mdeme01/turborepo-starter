import { Button, ThemeToggle } from '@repo/ui'
import { createFileRoute } from '@tanstack/react-router'

import { api } from '../core/trpc'
import { useAuth } from '../providers/AuthProvider'

const Home = () => {
    const auth = useAuth()
    const { mutateAsync: login } = api.user.login.useMutation()

    const handleLogin = async () => {
        if (auth.user) {
            return
        }
        const { jwt } = await login({ email: 'john.doe@gmail.com', password: 'Hello1234!' })
        auth.login(jwt)
    }

    const handleLogout = () => {
        if (!auth.user) {
            return
        }
        auth.logout()
    }

    return (
        <div className="flex h-full flex-col items-center justify-center space-y-5">
            <h1 className="text-xl font-bold">
                Welcome to Turborepo starter {auth.user ? auth.user.name : 'Anonymus'}!
            </h1>
            <ThemeToggle />
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export const Route = createFileRoute('/')({
    component: Home,
})
