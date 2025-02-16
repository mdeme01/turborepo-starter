import { LoginUserInput } from '@repo/api/schema'
import { Spinner } from '@repo/web-ui'
import { createContext, Suspense } from 'react'

import { api, TRPCRouterOutput } from '../core/trpc'

type AuthContextProps = {
    user?: TRPCRouterOutput['user']['auth']['getMe']
    login: ({ email, password }: LoginUserInput) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    login: async () => {},
    logout: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: user, isLoading } = api.user.auth.getMe.useQuery()

    const { mutateAsync: loginUser } = api.user.auth.login.useMutation()
    const { mutateAsync: logoutUser } = api.user.auth.logout.useMutation()

    const login = async ({ email, password }: LoginUserInput) => {
        await loginUser({ email, password })
    }

    const logout = async () => {
        await logoutUser()
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner size="large" />
            </div>
        )
    }

    return (
        <Suspense
            fallback={
                <div className="flex h-screen items-center justify-center">
                    <Spinner size="large" />
                </div>
            }
        >
            <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
        </Suspense>
    )
}
