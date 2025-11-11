import { Navigate } from "react-router-dom"

export default function RoleRoute({ allowedRole, children }) {
  const user = JSON.parse(localStorage.getItem("user"))

  if (user?.role !== allowedRole) {
    return <Navigate to={`/dashboard/${user?.role}`} replace />
  }

  return children
}
