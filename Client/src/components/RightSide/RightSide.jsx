import React from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import profileNav from '../../img/profileNav.png'
// import { UilSetting } from '@iconscout/react-unicons'
// import TrendCard from '../TrendCard/TrendCard'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FolloweresCard from '../FollowersCard/FolloweresCard'

const RightSide = () => {
  const { user } = useSelector((state) => state.user)
  const userId = user.Id
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

                    <Link to={'/chat'}> <img src={Comment} alt="" /></Link>
                </div>
                <div className='profileNav'>
                    <Link to={'/profile/' + userId}> <img src={profileNav} alt="" /></Link>

                </div>

            </div>
            <div className='TrendCard-righside'><FolloweresCard /></div>

        </div>
  )
}

export default RightSide
