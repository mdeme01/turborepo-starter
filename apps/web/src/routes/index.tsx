import { ThemeToggle } from '@repo/ui'
import { createFileRoute, Link } from '@tanstack/react-router'

const Home = () => {
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
