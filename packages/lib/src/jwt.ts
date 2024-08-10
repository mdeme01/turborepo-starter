import { envConfig } from '@repo/env'
import { sign, SignOptions, verify } from 'jsonwebtoken'
import { z } from 'zod'

const createKey = () => Buffer.from(envConfig.jwtSecret, 'base64').toString('ascii')

export const customJwtPayloadSchema = z.object({
    id: z.string().nullish(),
})

export type CustomJwtPayload = z.infer<typeof customJwtPayloadSchema>

export const signJwt = (payload: CustomJwtPayload, options?: SignOptions): string => {
    const privateKey = createKey()

    return sign(payload, privateKey, {
        ...options,
        expiresIn: options?.expiresIn ?? '30d',
    })
}

export const verifyJwt = (token: string): CustomJwtPayload | null => {
    try {
        const publicKey = createKey()

        const res = verify(token, publicKey)

        if (!res) {
            return null
        }

        const payload = customJwtPayloadSchema.safeParse(res)

        if (!payload.success || !payload.data.id) {
            return null
        }

        return payload.data
    } catch (error) {
        return null
    }
}
