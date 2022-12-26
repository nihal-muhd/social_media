import React from 'react'
import AdminHome from '../pages/Admin/AdminHome/AdminHome'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from '../pages/Admin/AdminLogin/AdminLogin'
import UserList from '../pages/Admin/UserList/UserList'

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route element={<AdminHome />} path='/' />
      </Routes>
      <Routes>
        <Route element={<AdminLogin />} path='/login' />
      </Routes>
      <Routes>
        <Route element={<UserList />} path='/user-list' />
      </Routes>
    </div>
  )
}

export default Admin
