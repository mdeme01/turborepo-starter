import { Button, ThemeToggle } from '@repo/web-ui'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useAuth } from '../hooks/useAuth'

const Home = () => {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = async () => {
        await logout()
        navigate({ to: '/auth/login' })
    }

    return (
        <div className="flex h-full flex-col items-center justify-center space-y-5">
            <h1 className="text-xl font-bold">
                Welcome to Turborepo starter {user?.name ?? 'Anonymus'}!
            </h1>
            <ThemeToggle />
            {user && <Button onClick={handleLogout}>Logout</Button>}
        </div>
    )
}

export const Route = createFileRoute('/')({
    component: Home,
})
