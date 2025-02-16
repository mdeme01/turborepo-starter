import { envConfig } from '@repo/env'
import { signJwt, verifyJwt } from '@repo/lib'
import { Context as HonoContext } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'

const ACCESS_TOKEN_COOKIE_NAME = 'access-token'
const ACCESS_TOKEN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export type UserContext = {
    id: string
}

const setAccessToken = ({ c, userId }: { c: HonoContext; userId: string }) => {
    const access_token = signJwt({ id: userId })

    setCookie(c, ACCESS_TOKEN_COOKIE_NAME, access_token, {
        path: '/',
        maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
        httpOnly: true,
        secure: !envConfig.isDev,
        sameSite: envConfig.isDev ? 'lax' : 'none',
    })
}

const deleteAccessToken = ({ c }: { c: HonoContext }) => {
    deleteCookie(c, ACCESS_TOKEN_COOKIE_NAME, {
        path: '/',
        maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
        httpOnly: true,
        secure: !envConfig.isDev,
        sameSite: envConfig.isDev ? 'lax' : 'none',
    })
}

const deserializeUser = async ({ c }: { c: HonoContext }): Promise<UserContext | null> => {
    const access_token = getCookie(c, ACCESS_TOKEN_COOKIE_NAME)

    if (!access_token) {
        return null
    }

    const user = verifyJwt(access_token)

    if (!user || !user.id) {
        return null
    }

    return {
        id: user.id,
    }
}

export const auth = {
    setAccessToken,
    deleteAccessToken,
    deserializeUser,
}
