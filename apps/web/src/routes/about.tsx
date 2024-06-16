import { createFileRoute, Link } from '@tanstack/react-router'

const About = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center space-y-5">
            <div>Tech stack:</div>
            <ul className="list-disc">
                <li>Turborepo</li>
                <li>React</li>
                <li>TypeScript</li>
                <li>TailwindCSS</li>
                <li>Shadcn UI</li>
                <li>TanStack Router</li>
            </ul>
            <Link to="/" className="hover:text-primary hover:underline">
                Home
            </Link>
        </div>
    )
}

export const Route = createFileRoute('/about')({
    component: About,
})
