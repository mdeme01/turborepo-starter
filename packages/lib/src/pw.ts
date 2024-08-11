import crypto from 'crypto'

export const hashPassword = async (password: string) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return `${salt}$${hash}`
}

export const verifyPassword = async (hash: string, password: string) => {
    const [salt, originalHash] = hash.split('$')
    const inputHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return inputHash === originalHash
}
