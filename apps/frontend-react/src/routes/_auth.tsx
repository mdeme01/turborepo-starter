import { createFileRoute, Outlet } from '@tanstack/react-router'

import { AuthLayout } from '../components/layouts/AuthLayout'

const Auth = () => {
    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    )
}

export const Route = createFileRoute('/_auth')({
    component: Auth,
})
