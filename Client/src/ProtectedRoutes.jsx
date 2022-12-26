import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Login from './pages/Login/Login'

const useAuth = () => {
  const { user } = useSelector((state) => state.user)
  return user && user.loggedIn
}

const ProtectedRoutes = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Login />
}

export default ProtectedRoutes
