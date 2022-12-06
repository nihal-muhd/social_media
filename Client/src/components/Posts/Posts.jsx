import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Post from '../Post/Post'
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import './Posts.css'

const Posts = () => {
    const [post, setPost] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        async function getPosts() {
            const posts = await axios.get('http://localhost:5000/get-post', { withCredentials: true })
            console.log(posts,"hii");
            setPost(posts.data.post);
        }
        getPosts()
        setLoading(false)
    }, [])


    return (
        <div className='Posts'>
            {loading ? <SpinnerIcon pulse style={{ fontSize: '2em' }} /> :
                post?.map((post, id) => {
                    return <Post key={id} data={post} id={id} />
                })}
        </div>
    )
}

export default Posts
