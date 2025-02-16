import { LoginUserInput } from '@repo/api/schema'
import { Spinner } from '@repo/web-ui'
import { createContext, Suspense, useEffect, useState } from 'react'

import { checkAuthToken, deleteAuthToken, setAuthToken } from '../core/auth'
import { api, TRPCRouterOutput } from '../core/trpc'

type AuthContextProps = {
    user?: TRPCRouterOutput['user']['getMe']
    login: ({ email, password }: LoginUserInput) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    login: async () => {},
    logout: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authed, setAuthed] = useState<boolean>(false)

    const { data: user, isLoading } = api.user.getMe.useQuery(undefined, {
        staleTime: Infinity,
        enabled: authed,
    })

    const { mutateAsync: loginUser } = api.user.login.useMutation()

    const login = async ({ email, password }: LoginUserInput) => {
        const { userId } = await loginUser({ email, password })
        await setAuthToken({ userId })
        setAuthed(true)
    }

    const logout = async () => {
        await deleteAuthToken()
        setAuthed(false)
    }

    useEffect(() => {
        const checkAuthed = async () => {
            const tokenExists = await checkAuthToken()
            setAuthed(tokenExists)
        }
        checkAuthed()
    }, [])

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
            <AuthContext.Provider value={{ user: authed ? user : undefined, login, logout }}>
                {children}
            </AuthContext.Provider>
        </Suspense>
    )
}
