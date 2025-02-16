import {
    Avatar,
    AvatarFallback,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    ThemeToggle,
} from '@repo/web-ui'
import { useRouter } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

import { useAuth } from '../../hooks/useAuth'
import { useUser } from '../../hooks/useUser'

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter()

    const { logout } = useAuth()
    const user = useUser()

    const handleLogout = async () => {
        await logout()
        await router.invalidate()
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex h-[60px] items-center justify-between border p-3">
                <div className="text-lg font-bold text-primary">Admin</div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="flex items-center gap-2"
                                onClick={handleLogout}
                            >
                                <LogOut size={20} className="text-destructive" />
                                <div>Logout</div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="grow">{children}</div>
        </div>
    )
}
