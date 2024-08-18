import { createRootRoute, Outlet } from '@tanstack/react-router'

const Root = () => {
    return (
        <div className="h-screen">
            <Outlet />
        </div>
    )
}

export const Route = createRootRoute({
    component: Root,
})
