import { LoginUserInput } from '@repo/api/schema'
import { Spinner } from '@repo/web-ui'
import { createContext, Suspense } from 'react'

import { api, TRPCRouterOutput } from '../core/trpc'

export type AuthContextUser = TRPCRouterOutput['user']['auth']['getMe']

type AuthContextProps = {
    user: AuthContextUser | null
    login: ({ email, password }: LoginUserInput) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: async () => {},
    logout: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: user, refetch, isLoading, isFetching, isPending } = api.user.auth.getMe.useQuery()

    const { mutateAsync: loginUser } = api.user.auth.login.useMutation()
    const { mutateAsync: logoutUser } = api.user.auth.logout.useMutation()

    const login = async ({ email, password }: LoginUserInput) => {
        await loginUser({ email, password })
        await refetch()
    }

    const logout = async () => {
        await logoutUser()
        await refetch()
    }

    if (isLoading || isFetching || isPending) {
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
            <AuthContext.Provider value={{ user: user ?? null, login, logout }}>
                {children}
            </AuthContext.Provider>
        </Suspense>
    )
}
