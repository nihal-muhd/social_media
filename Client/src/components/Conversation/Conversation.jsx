import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import profile from '../../img/defaultProfile.png'

import './Conversation.css'

const Conversation = ({ conversation }) => {
  const { user } = useSelector((state) => state.user)
  const userId = user.Id

  const members = conversation.members

  const [friends, setFriends] = useState(null)

  useEffect(() => {
    const friendId = members.find((m) => m !== userId)

    const getUser = async () => {
      const res = await axios.get('http://localhost:5000/get-user/' + friendId, { withCredentials: true })
      setFriends(res.data.user)
    }
    getUser()
  }, [userId, conversation])
  return (
        <>
            <div className='conversation'>

                <div className="online-dot"></div>
                <img src={friends?.profilePicture ? friends.profilePicture : profile} alt="" className='conversationImg' />

                <span className='conversationName'>{friends?.name}</span>

            </div>

        </>
  )
}

export default Conversation
