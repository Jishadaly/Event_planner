import { Navigate, Outlet } from "react-router-dom"
import Cookies from 'js-cookie'
import { useSelector } from "react-redux"

export default function ProtectedRoute() {
  const token = Cookies.get("token")
  const user = useSelector((state) => state?.auth?.isAuthenticated)
  
  console.log(token,"token")
  if (!user) return <Navigate to="/login" replace />
  return <Outlet/>
}
