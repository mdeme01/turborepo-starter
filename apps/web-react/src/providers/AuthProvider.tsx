import { createContext, Suspense, useEffect, useState } from 'react'

import { checkAuthToken, deleteAuthToken, setAuthToken } from '../core/auth'
import { api, TRPCRouterOutput } from '../core/trpc'

type AuthContextProps = {
    user?: TRPCRouterOutput['user']['getMe']
    login: ({ email, password }: { email: string; password: string }) => Promise<void>
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

    const login = async ({ email, password }: { email: string; password: string }) => {
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
        return <div>Loading...</div>
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthContext.Provider value={{ user: authed ? user : undefined, login, logout }}>
                {children}
            </AuthContext.Provider>
        </Suspense>
    )
}
