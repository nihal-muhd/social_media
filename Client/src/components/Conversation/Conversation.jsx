import React, { useState } from 'react'
import './Conversation.css'
import profile from '../../img/defaultProfile.png'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'


const Conversation = ({ conversation }) => {
    const { user } = useSelector((state) => state.user)
    const userId = user.Id
    console.log(conversation, "conversation");
    console.log(userId, "jajajaj")

    const members = conversation.members
    console.log(members, "g;ig;igi");

    const [friends, setFriends] = useState(null)


    useEffect(() => {
        const friendId = members.find((m) => m !== userId)

        const getUser = async () => {
            const res = await axios.get('http://localhost:5000/get-user/' + friendId, { withCredentials: true })
            console.log(res.data.user, "kuku")
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
