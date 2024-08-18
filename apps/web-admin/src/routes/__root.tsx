import { createRootRoute, Outlet, redirect, RouteComponent } from '@tanstack/react-router'
import { match, P } from 'ts-pattern'

import { AuthLayout } from '../components/AuthLayout'
import { MainLayout } from '../components/MainLayout'
import { checkAuthToken } from '../core/auth'
import { useAuth } from '../hooks/useAuth'

const RootRoute: RouteComponent = () => {
    const { user } = useAuth()

    return (
        <div className="h-screen">
            {match(user)
                .with(P.nullish, () => (
                    <AuthLayout>
                        <Outlet />
                    </AuthLayout>
                ))
                .otherwise(() => (
                    <MainLayout>
                        <Outlet />
                    </MainLayout>
                ))}
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
