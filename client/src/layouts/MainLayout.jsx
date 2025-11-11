import { Outlet } from "react-router-dom"
import ThemeToggle from "../componets/ThemeToggle"

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="p-4 border-b border-border flex items-center justify-between">
                <h1 className="text-xl font-semibold">EventHub</h1>
                <ThemeToggle />
            </header>

            <main className="flex-1 flex items-center justify-center p-4">
                <Outlet />
            </main>

            <footer className="p-4 text-center text-sm text-muted-foreground border-t border-border">
                © {new Date().getFullYear()} EventHub. All rights reserved.
            </footer>


        </div>
    )
}
