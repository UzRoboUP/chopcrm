import { Navigate, Outlet } from "react-router-dom"

const AuthRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (isAuthenticated) {
    return <Navigate to="/home" />
  }

  return <Outlet />
}
export default AuthRoutes