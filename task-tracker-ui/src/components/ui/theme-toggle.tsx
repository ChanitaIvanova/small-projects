import { Moon, Sun } from "lucide-react"
import { Button } from "./button"

export function ThemeToggle({
    toggleTheme,
    currentTheme,
}: {
    toggleTheme: () => void
    currentTheme: "light" | "dark"
}) {
    return (
        <Button className="p-2 shadow-none cursor-pointer w-10 h-10 hover:bg-sky-400 dark:hover:bg-sky-700" size="icon" onClick={toggleTheme}>
            {currentTheme === "dark" ? <Sun className="w-5 h-5 text-yellow-200" /> : <Moon className="w-5 h-5" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}