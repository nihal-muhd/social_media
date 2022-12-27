import React from 'react'

import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'

import './PostSide.css'

const PostSide = ({ location }) => {
  return (
    <div className='postSide'>
      <PostShare />
      {location === 'profilepage' ? <Posts location='profilepage' /> : <Posts />}
    </div>
  )
}

export default PostSide
