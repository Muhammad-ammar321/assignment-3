import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import type { RootState } from '../../app/store'
import type { ReactNode } from 'react'

interface PublicRouteProps {
  children: ReactNode
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user)

  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PublicRoute
