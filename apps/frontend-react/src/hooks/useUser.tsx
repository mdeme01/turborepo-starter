import { getRouteApi } from '@tanstack/react-router'

const authRouteApi = getRouteApi('/_auth')

export const useUser = () => {
    const { user } = authRouteApi.useLoaderData()
    return user
}
