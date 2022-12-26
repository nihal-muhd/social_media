import React from 'react'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import PostSide from '../../components/PostSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'

const Profile = () => {
  return (
    <div className='Profile'>
      <div className='profile-profileLeft'><ProfileLeft /></div>
      <div className="Profile-center">
        <ProfileCard location="profilepage" />
        <PostSide location="profilepage" />
      </div>
      <div><RightSide /></div>
    </div>
  )
}

export default Profile
