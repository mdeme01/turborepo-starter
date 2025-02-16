import { createFileRoute } from '@tanstack/react-router'

import { useAuth } from '../hooks/useAuth'

const Home = () => {
    const { user } = useAuth()

    return (
        <div className="flex h-full flex-col items-center justify-center space-y-5">
            <div className="text-xl font-bold">Welcome {user?.name}!</div>
        </div>
    )
}

export const Route = createFileRoute('/')({
    component: Home,
})
