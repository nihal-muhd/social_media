import React, { useState } from 'react'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'

import './Post.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import TrashIcon from '@rsuite/icons/Trash'
import SendIcon from '@rsuite/icons/Send'

const Post = ({ data, location, handleDelete }) => {
  const { user } = useSelector((state) => state.user)

  const [liked, setLiked] = useState(data.likes.includes(user.Id))
  const [likes, setLikes] = useState(data.likes.length)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')

  const handleLike = async () => {
    setLiked((prev) => !prev)
    if (!liked) {
      axios.post('http://localhost:5000/like-post', { postId: data._id, userId: user.Id }, { withCredentials: true })
      setLikes((prev) => prev + 1)
    } else {
      axios.post('http://localhost:5000/unlike-post', { postId: data._id, userId: user.Id }, { withCredentials: true })
      setLikes((prev) => prev - 1)
    }
  }

  const handleComment = (postId, username, comment) => {
    axios.post('http://localhost:5000/comment-post', { postId, username, comment }, { withCredentials: true })
    setShowComment(false)
  }

  return (
        <div className='Post'>
            {location === 'profilepage' ? <TrashIcon style={{ cursor: 'pointer', alignSelf: 'flex-end' }} onClick={() => { handleDelete(data._id) }} /> : ''}

            <img src={data.imageUrl} alt="" />

            <div className="postReact">
                <img src={liked ? Heart : NotLike} alt="" style={{ cursor: 'pointer' }} onClick={handleLike} />
                <img src={Comment} alt="" style={{ cursor: 'pointer' }} onClick={() => setShowComment((prev) => !prev)} />
                <img src={Share} alt="" />
            </div>

            {showComment ? <> <div className='input-div'><input type="text" className='infoInput comment-input' placeholder='comment here...' onChange={(e) => setComment(e.target.value)} /> <span><SendIcon onClick={() => { handleComment(data._id, user.name, comment) }} /></span> </div> </> : ''}

            {data?.comments && data?.comments?.map((val, id) => {
              return (
                    <div className='comment-section' key={id}>
                        <span style={{ color: 'gray', fontSize: '12px' }}><b>{val.username}</b></span>
                        <span style={{ fontSize: '12px' }}> {val.comment}</span>
                    </div>
              )
            })}

            <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likes} likes</span>
            <div className="detail">
                <span><b>{data.user_name}</b></span>
                <span> {data.desc}</span>
            </div>

        </div>
  )
}

export default Post
