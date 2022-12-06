import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
import './Posts.css'

const Posts = () => {
    const [loadin, setLoading] = useState(false)

    useEffect(() => {
        async function getPosts() {
            const post = await axios.get('/http://localhost:5000/admin/get-post', { withCredentials: true })
            console.log(post, "my post");
        }
        getPosts()
    })

    return (
        <div className='Posts'>
            {PostsData.map((post, id) => {
                return <Post data={post} id={id} />
            })}
        </div>
    )
}

export default Posts
