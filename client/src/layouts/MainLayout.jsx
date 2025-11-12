import { Outlet } from "react-router-dom"
import ThemeToggle from "../componets/ui/ThemeToggle"
import Header from "../componets/landing/Header"
import Footer from "../componets/landing/Footer"
import Logo from "../componets/ui/Logo"

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* <header className="p-4 border-b border-border flex items-center justify-between">
                <h1 className="text-xl font-semibold">EventHub</h1>
                <ThemeToggle />
            </header> */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Logo to="/" />
                <ThemeToggle/>
            </div>
        </header>

            <main className="flex-1 flex items-center justify-center p-4">
                <Outlet />
            </main>

            <Footer />


        </div>
    )
}
