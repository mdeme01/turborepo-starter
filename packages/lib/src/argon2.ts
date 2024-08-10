const loadArgon2 = async () => {
    const argon2 = await import('argon2')
    return argon2
}

export const hashPassword = async (password: string) => {
    const argon2 = await loadArgon2()
    return await argon2.hash(password)
}

export const verifyPassword = async (hash: string, password: string) => {
    const argon2 = await loadArgon2()
    return await argon2.verify(hash, password)
}
