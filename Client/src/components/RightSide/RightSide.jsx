import React from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Message from '../../img/messaage.png'
import profileNav from '../../img/profileNav.png'
// import { UilSetting } from '@iconscout/react-unicons'
// import TrendCard from '../TrendCard/TrendCard'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FolloweresCard from '../FollowersCard/FolloweresCard'
import LogoutNav from '../../img/logout.png'
import { useCookies } from 'react-cookie'
import { logout } from '../../redux/userSlice'

const RightSide = () => {
  const { user } = useSelector((state) => state.user)
  const userId = user.Id
  const navigate = useNavigate()
  const [cookie, setCookie, removeCookie] = useCookies([])
  const dispatch = useDispatch()

  const Logout = () => {
    removeCookie('jwt')
    dispatch(logout())
    navigate('/login')
  }
  return (
        <div className='RightSide'>
            <div className="navIcons">
                <div>
                    <Link to="/">  <img src={Home} alt="" /></Link>
                </div>
                <div>
                    <Link> <img src={Noti} alt="" /></Link>
                </div>
                <div>
                    <Link to={'/chat'}> <img src={Message} alt="" /></Link>
                </div>
                <div className='profileNav'>
                    <Link to={'/profile/' + userId}> <img src={profileNav} alt="" /></Link>
                </div>
                <div className='profileNav'>
                    <Link onClick={Logout}> <img src={LogoutNav} alt="" /></Link>
                </div>

            </div>
            <div className='TrendCard-righside'><FolloweresCard /></div>

        </div>
  )
}

export default RightSide
