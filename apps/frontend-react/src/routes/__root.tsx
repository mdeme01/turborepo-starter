import { createRootRoute, Outlet, RouteComponent } from '@tanstack/react-router'
import { match, P } from 'ts-pattern'

import { AuthLayout } from '../components/AuthLayout'
import { MainLayout } from '../components/MainLayout'
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
})
