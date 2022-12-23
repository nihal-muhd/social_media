import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Post from '../Post/Post'
import SpinnerIcon from '@rsuite/icons/legacy/Spinner'
import './Posts.css'
import { useSelector } from 'react-redux'

const Posts = ({ location }) => {
  const { user } = useSelector((state) => state.user)
  const userId = user.Id

  const [post, setPost] = useState(null)
  const [profilePost, setProfilePost] = useState()

  useEffect(() => {
    const getPost = async () => {
      const posts = await axios.post('http://localhost:5000/get-post', { userId }, { withCredentials: true })
      setPost(posts.data.post)
      const proflepost = await axios.post('http://localhost:5000/get-profilePost', { userId }, { withCredentials: true })
      setProfilePost(proflepost.data.mypost)
    }
    getPost()
  }, [userId])

  const handleDelete = async (postId) => {
    await axios.post('http://localhost:5000/delete-post', { postId }, { withCredentials: true })
  }

  // const handleComment = async (postId, userId, comment) => {
  //     console.log(postId, userId, comment,"moorr");
  // }

  if (!post) { <SpinnerIcon pulse style={{ fontSize: '2em' }} /> }

  return (
        <div className='Posts'>

            {location === 'profilepage'
              ? profilePost?.map((post, id) => {
                return <Post key={id} data={post} id={id} location='profilepage' handleDelete={handleDelete} />
              })
              : post?.map((post, id) => {
                return <Post key={id} data={post} id={id} />
              })
            }
        </div>
  )
}

export default Posts
