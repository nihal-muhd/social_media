import React from 'react'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useState } from 'react'
import './Post.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import TrashIcon from '@rsuite/icons/Trash';

const Post = ({ data, location, handleDelete}) => {
    const { user } = useSelector((state) => state.user)

    const [liked, setLiked] = useState(data.likes.includes(user.Id))
    const [likes, setLikes] = useState(data.likes.length)

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

    // const handleDelete = async (postId) => {
    //     const dltPost = await axios.post('http://localhost:5000/delete-post', { postId }, { withCredentials: true })
    // }

    return (
        <div className='Post'>
            {location === 'profilepage' ? <TrashIcon style={{ cursor: "pointer" }} onClick={() => { handleDelete(data._id) }} /> : ''}
            <img src={data.imageUrl} alt="" />


            <div className="postReact">
                <img src={liked ? Heart : NotLike} alt="" style={{ cursor: "pointer" }} onClick={handleLike} />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>


            <span style={{ color: "var(--gray)", fontSize: "12px" }}>{likes} likes</span>
            <div className="detail">
                <span><b>{data.user_name}</b></span>
                <span> {data.desc}</span>
            </div>

        </div>
    )
}

export default Post
