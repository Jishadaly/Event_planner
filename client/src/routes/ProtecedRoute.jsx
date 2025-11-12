import { Navigate, Outlet } from "react-router-dom"
import Cookies from 'js-cookie'

export default function ProtectedRoute() {
  const token = Cookies.get("token")
  console.log(token,"token")
  if (!token) return <Navigate to="/login" replace />
  return <Outlet/>
}
