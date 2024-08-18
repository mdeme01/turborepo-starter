import { Button, ThemeToggle } from '@repo/web-ui'
import { createFileRoute } from '@tanstack/react-router'

import { useAuth } from '../hooks/useAuth'

const Home = () => {
    const { user, login, logout } = useAuth()

    const handleLogin = async () => {
        await login({ email: 'john.doe@gmail.com', password: 'Hello1234!' })
    }

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className="flex h-full flex-col items-center justify-center space-y-5">
            <h1 className="text-xl font-bold">
                Welcome to Turborepo starter {user?.name ?? 'Anonymus'}!
            </h1>
            <ThemeToggle />
            {!user && <Button onClick={handleLogin}>Login</Button>}
            {user && <Button onClick={handleLogout}>Logout</Button>}
        </div>
    )
}

export const Route = createFileRoute('/')({
    component: Home,
})
