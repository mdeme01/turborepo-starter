/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from 'react'

import { api, TRPCRouterOutput } from '../core/trpc'

type AuthContextProps = {
    user?: TRPCRouterOutput['user']['getMe']
    login: (token: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    login: async () => {},
    logout: async () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authed, setAuthed] = useState<boolean>(false)

    const { data, refetch, isLoading, isError } = api.user.getMe.useQuery(undefined, {
        staleTime: Infinity,
        enabled: authed,
    })

    const login = async (token: string) => {
        localStorage.setItem('auth-token', token)
        setAuthed(true)
        await refetch()
    }

    const logout = async () => {
        localStorage.removeItem('auth-token')
        setAuthed(false)
    }

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('auth-token')
            if (token) {
                await login(token)
            }
        }
        checkAuth()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const checkError = async () => {
            if (isError) {
                await logout()
            }
        }
        checkError()
    }, [isError])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <AuthContext.Provider value={{ user: authed ? data : undefined, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
