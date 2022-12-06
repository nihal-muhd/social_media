import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSIde from '../../components/ProfileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'

const Home = () => {
  return (
    <div className='Home'>
        <ProfileSIde/>
        <PostSide/>
        <RightSide/>
      
    </div>
  )
}

export default Home
