import React from 'react'
import { useSessionStore } from '../store/sessionStore'
import { Navigate } from 'react-router'

const ProtectedRoute = ({children}) => {
  const {user} = useSessionStore()

  if(!user) return <Navigate to="/" replace />

  return children
}

export default ProtectedRoute