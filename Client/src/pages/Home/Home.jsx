import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSIde from '../../components/ProfileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'

const Home = () => {
  return (
    <div className='Home'>
      <div className='ProfileSide-home'><ProfileSIde /></div>
      <PostSide />
      <div className="RightSide-home"><RightSide /></div>

    </div>
  )
}

export default Home
