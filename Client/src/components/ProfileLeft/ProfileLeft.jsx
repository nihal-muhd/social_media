import React from 'react'

import LogoSearch from '../../components/LogoSearch/LogoSearch'
import InfoCard from '../InfoCard/InfoCard'

const ProfileLeft = () => {
  return (
    <div className='ProfileSide'>
    <LogoSearch/>
    <InfoCard/>
    {/* <FollowersCard/> */}
    </div>
  )
}

export default ProfileLeft
