import { createRootRoute, Outlet, redirect, RouteComponent } from '@tanstack/react-router'

import { checkAuthToken } from '../core/auth'

const RootRoute: RouteComponent = () => {
    return (
        <div className="h-screen">
            <Outlet />
        </div>
    )
}

export const Route = createRootRoute({
    component: RootRoute,
    beforeLoad: async ({ location }) => {
        const isAuthed = await checkAuthToken()
        const authRoute = location.pathname.includes('/auth')

        if (isAuthed && authRoute) {
            return redirect({ to: '/' })
        }
        if (!isAuthed && !authRoute) {
            return redirect({ to: '/auth/login' })
        }
    },
})
