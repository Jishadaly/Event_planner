import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/Button"
import { LogOut } from "lucide-react"
import { LayoutDashboard } from "lucide-react"
import NotificationsPanel from "../notification/NotificationPanel"
import ThemeToggle from "../ui/ThemeToggle"
import Logo from "../ui/Logo"

export default function DashboardHeader() {
    const location = useLocation()
    const path = location.pathname

    const roleLabel = {
        admin: "Admin Dashboard",
        organizer: "Organizer Dashboard",
        participant: "Participant Dashboard",
    }

    // You can detect userRole globally (example: from localStorage)
    const userRole = localStorage.getItem("userRole") || "participant"

    // Map route -> title & subtitle
    const routeTitles = [
        { path: "/dashboard", title: "Dashboard", subtitle: roleLabel[userRole] },
        { path: "/events", title: "Events", subtitle: "Discover and join events" },
        { path: "/events/", title: "Event Details", subtitle: "Detailed information about the event" },
        { path: "/profile", title: "Profile", subtitle: "Manage your account" },
    ]

    // Find matching route title
    const activeRoute =
        routeTitles.find((r) => path === r.path || path.startsWith(r.path)) ||
        { title: "EventHub", subtitle: "Your all-in-one event platform" }

    const isDashboardPage = path.includes("/dashboard")

    return (
        <header className="bg-background border-b border-border">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Left: Logo & Title */}
                    <div className="flex items-center gap-4">
                        <Logo to="/dashboard" />

                        <div className="hidden sm:block">
                            <h1 className="text-2xl font-bold">{activeRoute.title}</h1>
                            <p className="text-sm text-muted-foreground">{activeRoute.subtitle}</p>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1">
                        {isDashboardPage ? (
                            <Link to="/events">
                                <Button variant="outline" size="sm">
                                    Browse Events
                                </Button>
                            </Link>
                        ) : (
                            <Link to={`/dashboard/${userRole}`}>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Button>
                            </Link>
                        )}

                        <NotificationsPanel />
                        <Button variant="ghost" size="sm">
                            <ThemeToggle />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
