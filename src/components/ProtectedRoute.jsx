import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { ready, isAuthenticated } = useAuth()

  if (!ready) {
    return <div className="dashboard-loading">Checking your session...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
