import { createFileRoute } from '@tanstack/react-router'

import { useUser } from '../../hooks/useUser'

const Home = () => {
    const user = useUser()

    return (
        <div className="flex h-full flex-col items-center justify-center space-y-5">
            <div className="text-xl font-bold">Welcome {user.name}!</div>
        </div>
    )
}

export const Route = createFileRoute('/_auth/')({
    component: Home,
})
