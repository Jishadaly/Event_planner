// src/routes/PublicOnlyRoute.jsx
import { Navigate, Outlet } from "react-router-dom"
import Cookies from "js-cookie"

export default function PublicOnlyRoute() {
  const token = Cookies.get("token")

  if (token) {
    // Already logged in → redirect to dashboard
    return <Navigate to="/dashboard" replace />
  }

  // Otherwise allow access
  return <Outlet />
}
