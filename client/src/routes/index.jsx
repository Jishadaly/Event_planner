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
import { SocketProvider } from "../context/SocketContext"
import { useSelector } from "react-redux"

export default function AppRoutes() {
  const user = useSelector((state) => state?.auth?.user)

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      
      <Route element={<MainLayout />}>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<SocketProvider userId={user?._id} > <ProtectedRoute />  </SocketProvider>}>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="events" element={<EventsListingPage />} />
          <Route path="events/:id" element={<EventDetailsPage />} />
        </Route>

      </Route>

    </Routes >
  )
}
