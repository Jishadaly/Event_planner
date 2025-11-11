import { Outlet } from "react-router-dom"
import DashboardHeader from "../componets/dashboard/DashboardHeader"
import { useState } from "react"

export default function DashboardLayout() {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
                {/* <h1 className="font-bold text-lg">EventHub Dashboard</h1>
                <span className="text-sm">Hi, {user?.fullName || "User"}</span> */}
                <DashboardHeader userRole={'participant'} />

            </header>

            <main className="flex-1 p-6 bg-background">
                <Outlet />
            </main>

            <footer className="p-4 text-center text-muted-foreground text-sm border-t border-border">
                Dashboard © EventHub
            </footer>
        </div>
    )
}
