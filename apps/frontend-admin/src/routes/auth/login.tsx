import { zodResolver } from '@hookform/resolvers/zod'
import { LoginUserInput, loginUserSchema } from '@repo/api/schema'
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Spinner,
} from '@repo/web-ui'
import { createFileRoute, RouteComponent, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { useAuth } from '../../hooks/useAuth'

const LoginRoute: RouteComponent = () => {
    const router = useRouter()

    const { login } = useAuth()

    const form = useForm<LoginUserInput>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const { control, handleSubmit } = form

    const onSubmit = async (data: LoginUserInput) => {
        await login(data)
        await router.invalidate()
    }

    return (
        <div className="flex h-full">
            <Form {...form}>
                <form
                    className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-transparent from-80% to-primary/50 sm:flex-[0.5] sm:to-transparent"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex w-[300px] flex-col justify-center space-y-4">
                        <div className="text-center text-xl font-bold">Welcome</div>
                        <div>
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@eg.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="************"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="flex items-center gap-2"
                            disabled={form.formState.isSubmitting}
                        >
                            <Spinner size="small" show={form.formState.isSubmitting} />
                            <div>Login</div>
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="hidden flex-none items-center justify-center bg-gradient-to-r from-transparent to-primary/50 sm:flex sm:flex-[0.5]" />
        </div>
    )
}

export const Route = createFileRoute('/auth/login')({
    component: LoginRoute,
})
