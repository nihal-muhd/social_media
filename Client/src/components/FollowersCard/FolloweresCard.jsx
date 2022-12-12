import React, { useEffect, useState } from 'react'

import { Followers } from '../../Data/FolloweresData'
import profile from '../../img/defaultProfile.png'
import axios from 'axios'
import { useSelector } from 'react-redux'
import './FollowersCard.css'

const FolloweresCard = () => {
  const { user } = useSelector((state) => state.user)

  const [users, setUsers] = useState([])

  useEffect(() => {
    async function getUsers() {
      const res = await axios.get('http://localhost:5000/get-users', { withCredentials: true })
      const userList = res.data.users
      console.log(userList, "mens are here");
      setUsers(userList.filter((val) => val._id !== user.Id))
    }
    getUsers()
  }, [])

  const handleFollow = (userId) => {
    axios.post('http://localhost:5000/follow-users', { userId }, { withCredentials: true })
  }

  const handleUnFollow = (userId) => {
    axios.post('http://localhost:5000/unfollow-users', { userId }, { withCredentials: true })
  }

  return (
    <div className='FollowersCard'>
      <h3>People you may know </h3>
      {users.map((follower, id) => {
        return (
          <div className="follower" key={id}>
            <div>
              <img src={follower.profilePicture ? follower.profilePicture : profile} alt="" className='follwerImg' />
              <div className="name">
                <span>{follower.name}</span>
                <span>{follower.email}</span>
              </div>
            </div>

            {user.followers[0] ?
              user.followers.map((val, id) => {
                if (val === follower._id) {
                  return <button className='button fc-button' onClick={() => { handleUnFollow(follower._id) }} key={id}>
                    unfollow
                  </button>
                } else {
                  return <button className='button fc-button' onClick={() => {
                    handleFollow(follower._id)
                  }} key={id}>
                    follow
                  </button>
                }
              }) :
              <button className='button fc-button' onClick={() => {
                handleFollow(follower._id)
              }} key={id}>follow</button>
            }


          </div>
        )
      })}
    </div>
  )
}

export default FolloweresCard
