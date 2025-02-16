import { createRouter, RouterProvider as InnerRouterProvider } from '@tanstack/react-router'

import { useAuth } from '../hooks/useAuth'
import { routeTree } from '../routeTree.gen'
import { AuthContextUser } from './AuthProvider'

export type RouterContext = {
    user: AuthContextUser | null
}

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const router = createRouter({
    routeTree,
    context: { user: null },
})

export const RouterProvider = () => {
    const { user } = useAuth()

    return <InnerRouterProvider router={router} context={{ user }} />
}
