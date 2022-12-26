import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Conversation from '../../components/Conversation/Conversation'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import Message from '../../components/Message/Message'
import RightSide from '../../components/RightSide/RightSide'
import './Messenger.css'
import { io } from 'socket.io-client'

const Messenger = () => {
  const { user } = useSelector((state) => state.user)
  const userId = user.Id
  const scrollRef = useRef()
  const socket = useRef()

  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)

  useEffect(() => {
    console.log('effect 1')
    socket.current = io('ws://localhost:8900')
    console.log('1')
    socket.current.on('getMessage', data => {
      console.log(data, 'ooobi')
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        craetedAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    console.log('effect 2')
    console.log(arrivalMessage, 'arrival message effect 2')
    console.log(currentChat, 'current chat effect 2')
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    console.log('effect 3')
    socket.current.emit('addUser', userId)
    socket.current.on('getUsers', users => {
      console.log(users, 'kadaaapuram')
    })
  }, [user])

  useEffect(() => {
    console.log('effect 4')
    const getConversations = async () => {
      const res = await axios.get('http://localhost:5000/conversation/' + userId, { withCredentials: true })
      setConversations(res.data.conversation)
    }
    getConversations()
  }, [userId])

  useEffect(() => {
    console.log('effect 5')
    const getMessages = async () => {
      const res = await axios.get('http://localhost:5000/message/' + currentChat?._id, { withCredentials: true })
      setMessages(res.data.messages)
    }
    getMessages()
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id
    }

    const receiverId = currentChat.members.find(member => member !== userId)

    socket.current.emit('sendMessage', {
      senderId: userId,
      receiverId,
      text: newMessage
    })

    const res = await axios.post('http://localhost:5000/message', message, { withCredentials: true })
    setMessages([...messages, res.data.savedMessage])
    setNewMessage('')
  }

  useEffect(() => {
    console.log('effect 6')
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  console.log(arrivalMessage, 'arrival message vannu')

  return (
    <>
      <LogoSearch />
      <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">

            {conversations.map((c) => (
              // eslint-disable-next-line react/jsx-key
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} />
              </div>
            ))}

          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat
                ? <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      // eslint-disable-next-line react/jsx-key
                      <div ref={scrollRef}>

                        <Message message={m} own={m.sender === userId} />
                      </div>
                    ))}

                  </div>
                  <div className="chatBoxBottom">
                    <textarea className='chatMessageInput' placeholder='write something...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                    <button className='chatSubmitButton' onClick={handleSubmit}>send</button>
                  </div></>
                : <span className='noConversationText'>Open a conversation to start a chat</span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <RightSide />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
