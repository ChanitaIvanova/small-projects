import { ReactNode, useEffect, useState } from "react"
import { ThemeToggle } from "./theme-toggle"

export function ThemeProvider() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const effectiveTheme = storedTheme || (systemPrefersDark ? "dark" : "light")

    document.documentElement.classList.toggle("dark", effectiveTheme === "dark")
    setTheme(effectiveTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
    setTheme(newTheme)
  }

  return (
    <>
      <ThemeToggle toggleTheme={toggleTheme} currentTheme={theme} />
    </>
  )
}