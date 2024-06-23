import { ThemeToggle } from '@repo/ui'
import { createFileRoute, Link } from '@tanstack/react-router'

import { api } from '../core/trpc'

const Home = () => {
    const { data } = api.user.getAll.useQuery({ name: 'John Doe' })
    console.log(data)

    return (
        <div className="flex h-full flex-col items-center justify-center space-y-5">
            <h1 className="text-xl font-bold">Welcome to Turborepo starter!</h1>
            <ThemeToggle />
            <Link to="/about" className="hover:text-primary hover:underline">
                About
            </Link>
        </div>
    )
}

export const Route = createFileRoute('/')({
    component: Home,
})
