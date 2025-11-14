// src/routes/PublicOnlyRoute.jsx
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function PublicOnlyRoute() {

  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated)


  if (isAuthenticated) {
    // Already logged in → redirect to dashboard
    return <Navigate to="/dashboard" replace />
  }

  // Otherwise allow access
  return <Outlet />
}
