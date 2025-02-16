import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

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
    loader: async ({ context }) => {
        if (!context.user) {
            throw redirect({ to: '/auth/login' })
        }

        return { user: context.user }
    },
})
