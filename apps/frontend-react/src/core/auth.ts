export const setAuthToken = async ({ userId }: { userId: string }) => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/token`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ userId }),
    })
}

export const checkAuthToken = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/token`, {
        method: 'GET',
        credentials: 'include',
    })
    const data = await res.json()
    return data.authed as boolean
}

export const deleteAuthToken = async () => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/token`, {
        method: 'DELETE',
        credentials: 'include',
    })
}
