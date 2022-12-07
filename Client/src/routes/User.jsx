import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Profile from '../pages/Profie/Profile'
import Signup from '../pages/Signup/Signup'
import Otp from '../pages/Otp/Otp'
import ProtectedRoutes from '../ProtectedRoutes'

const User = () => {
    return (
        <div>
            <Routes>
                <Route element={<Signup />} path='/signup' />
                <Route element={<Otp />} path='/verify-user' />
                <Route element={<Login />} path='/login' />
                
                <Route element={<ProtectedRoutes />}>
                    <Route element={<Home />} path='/' />
                    <Route element={<Profile />} path='/profile/:id' />
                </Route>
            </Routes>
        </div >
    )
}

export default User
