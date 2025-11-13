
import { Link } from "react-router-dom"
import { Button } from "../ui/Button"
import Logo from "../ui/Logo"
import ThemeToggle from "../ui/ThemeToggle"

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Logo to="/" />

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-6">
                    <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
                        Features
                    </a>
                    <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition">
                        About
                    </a>
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Link to="/login">
                        <Button variant="ghost" size="sm">
                            Login
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
