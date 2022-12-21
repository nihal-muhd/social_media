import React from 'react'
import './Message.css'
import profile from '../../img/defaultProfile.png'
import { format } from 'timeago.js'

const Message = ({ message, own }) => {
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className="messageTop">
                <img className='messageImg' src={profile} alt="" />
                <p className='messageText'>{message.text}</p>

            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div >
    )
}

export default Message
