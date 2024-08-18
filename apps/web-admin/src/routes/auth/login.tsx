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
} from '@repo/web-ui'
import { createFileRoute, RouteComponent } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { useAuth } from '../../hooks/useAuth'

const LoginRoute: RouteComponent = () => {
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
    }

    return (
        <div className="flex h-full">
            <Form {...form}>
                <form
                    className="flex flex-[0.5] flex-col justify-center"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col justify-center space-y-4 px-48">
                        <div className="text-center text-xl font-bold">Login</div>
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
                                            <Input placeholder="example@eg.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Continue</Button>
                    </div>
                </form>
            </Form>
            <div className="flex flex-[0.5] items-center justify-center bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
    )
}

export const Route = createFileRoute('/auth/login')({
    component: LoginRoute,
})
