import { useState } from "react"
// import AdminDashboard from "./admin-dashboard"
// import OrganizerDashboard from "./organizer-dashboard"
import DashboardHeader from "../componets/dashboard/DashboardHeader"
import ParticipantDashboard from "../componets/dashboard/ParticipantDashboard"
import AdminDashboard from "../componets/dashboard/AdminDashboard"
import OrganizerDashboard from "../componets/dashboard/OrganizerDashboard"
import { useSelector } from "react-redux"


export default function DashboardPage() {
    const user = useSelector((state) => state?.auth?.user)
    const userRole = user?.role

    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {userRole === "admin" && <AdminDashboard />}
                {userRole === "organizer" && <OrganizerDashboard />}
                {userRole === "participant" && <ParticipantDashboard />}
            </main>
        </div>
    )
}
