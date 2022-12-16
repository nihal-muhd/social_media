import React from 'react'
import { Link } from 'react-router-dom'
import Conversation from '../../components/Conversation/Conversation'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import { UilSetting } from "@iconscout/react-unicons";
import Comment from "../../img/comment.png";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import './Chat.css'

const Chat = () => {
    return (
        <div className='Chat'>
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">

                    <h2>Chats</h2>
                    <div className="Chat-list">
                        <div>
                            <Conversation />
                        </div>

                    </div>
                </div>
            </div>

            <div className="Right-side-chat">
                <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
                    <div className="navIcons">
                        <Link to="/">  <img src={Home} alt="" /></Link>
                        <UilSetting />
                        <img src={Noti} alt="" />
                        <Link to={'/chat'}>     <img src={Comment} alt="" /></Link>
                    </div>
                    {/* <ChatBox chat={currentChat}/>  */}
                </div>
            </div>
        </div>
    )
}

export default Chat
