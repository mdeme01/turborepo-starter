import {
    createRootRouteWithContext,
    Outlet,
    redirect,
    RouteComponent,
} from '@tanstack/react-router'

import { RouterContext } from '../providers/RouterProvider'

const RootRoute: RouteComponent = () => {
    return (
        <div className="h-screen">
            <Outlet />
        </div>
    )
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootRoute,
    loader: async ({ context, location }) => {
        const isPublicRoute = location.pathname.startsWith('/auth')

        if (!isPublicRoute && !context.user) {
            throw redirect({ to: '/auth/login' })
        }
        if (isPublicRoute && context.user) {
            throw redirect({ to: '/' })
        }
    },
})
