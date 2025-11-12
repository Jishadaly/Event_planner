import { Navigate } from "react-router-dom"

export default function RoleRoute({ allowedRole, children }) {
  
  if (user?.role !== allowedRole) {
    return <Navigate to={`/dashboard/${user?.role}`} replace />
  }

  return children
}
