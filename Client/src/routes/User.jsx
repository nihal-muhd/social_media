import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Profile from '../pages/Profie/Profile'
import Signup from '../pages/Signup/Signup'
import Otp from '../pages/Otp/Otp'
import ProtectedRoutes from '../ProtectedRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import { getUserData } from '../redux/userSlice'


const User = () => {
    const { user } = useSelector((state) => state.user)
    const [cookies, setCookies] = useCookies([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user && cookies.jwt) {
            dispatch(getUserData())
        }
    },[])
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
