import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import type { RootState } from '../app/store'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  if (!isAuthenticated) {
    return <Navigate to="login" replace />
  }

  return children
}

export default ProtectedRoute
