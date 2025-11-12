import { Routes, Route } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import MainLayout from "../layouts/MainLayout"
import DashboardPage from "../pages/DashboardPage"
import DashboardLayout from "../layouts/DashboardLayout"
import EventsListingPage from "../pages/EventsPage"
import EventDetailsPage from "../pages/EventDetailPage"
import Home from "../pages/LandingPage"
import ProtectedRoute from "./ProtecedRoute"
import PublicOnlyRoute from "./PublicRoute"
// import AuthLayout from "@/layouts/AuthLayout"
// import DashboardLayout from "@/layouts/DashboardLayout"
// import OrganizerDashboard from "@/pages/dashboard/OrganizerDashboard"
// import ParticipantDashboard from "@/pages/dashboard/ParticipantDashboard"


// import ProtectedRoute from "./ProtectedRoute"
// import RoleRoute from "./RoleRoute"

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<MainLayout />}>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>


      <Route element={<DashboardLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="events" element={<EventsListingPage />} />
          <Route path="events/:id" element={<EventDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
