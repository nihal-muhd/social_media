import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Post from '../Post/Post'
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import './Posts.css'
import { useSelector } from 'react-redux'


const Posts = ({ location }) => {
    const { user } = useSelector((state) => state.user)
    const userId = user.Id


    const [post, setPost] = useState()

    useEffect(() => {

        async function getPost() {
            const posts = await axios.post('http://localhost:5000/get-post', { userId }, { withCredentials: true })
            setPost(posts.data.post)
        }
        getPost()
    }, [userId])

    const handleDelete = async (postId) => {
        console.log(postId);
        await axios.post('http://localhost:5000/delete-post', { postId }, { withCredentials: true })
    }

    // const handleComment = async (postId, userId, comment) => {
    //     console.log(postId, userId, comment,"moorr");
    // }




    if (!post)
        <SpinnerIcon pulse style={{ fontSize: '2em' }} />

    return (
        <div className='Posts'>

            {location === 'profilepage' ?
                post?.map((post, id) => {
                    return <Post key={id} data={post} id={id} location='profilepage' handleDelete={handleDelete} />
                }) :
                post?.map((post, id) => {
                    return <Post key={id} data={post} id={id} />
                })
            }
        </div>
    )
}

export default Posts
