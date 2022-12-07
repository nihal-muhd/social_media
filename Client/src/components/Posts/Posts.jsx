import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Post from '../Post/Post'
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import './Posts.css'


const Posts = () => {
    const [post, setPost] = useState()

 

    useEffect(() => {
        async function getPost() {
            const posts = await axios.get('http://localhost:5000/get-post', { withCredentials: true })
            setPost(posts.data.post)
        }
        getPost()
    }, [])



    if (!post)
        <SpinnerIcon pulse style={{ fontSize: '2em' }} />

    return (
        <div className='Posts'>

            {post?.map((post, id) => {
                return <Post key={id} data={post} id={id} />
            })}
        </div>
    )
}

export default Posts
