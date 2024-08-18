import { Check, Moon, Sun } from 'lucide-react'

import { Button } from './Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './DropdownMenu'
import { useTheme } from './ThemeProvider'

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className="flex items-center justify-between"
                    onClick={() => setTheme('light')}
                >
                    <div>Light</div>
                    {theme === 'light' && <Check size={20} className="text-primary" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex items-center justify-between"
                    onClick={() => setTheme('dark')}
                >
                    <div>Dark</div>
                    {theme === 'dark' && <Check size={20} className="text-primary" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="flex items-center justify-between"
                    onClick={() => setTheme('system')}
                >
                    <div>System</div>
                    {theme === 'system' && <Check size={20} className="text-primary" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
