import React from 'react'

import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'

import './ProfileSide.css'

const ProfileSIde = () => {
  return (
    <div className='ProfileSide'>
     <LogoSearch/>
     <ProfileCard location="homepage"/>
     {/* <FolloweresCard/> */}
    </div>
  )
}

export default ProfileSIde
