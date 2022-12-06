import React from 'react'
import './FollowersCard.css'

import {Followers} from '../../Data/FolloweresData'

const FolloweresCard = () => {
  return (
    <div className='FollowersCard'>
      <h3>People you may know </h3>
      {Followers.map((follower,id)=>{
        return(
            <div className="follower" key={id}>
                <div>
                    <img src={follower.img} alt="" className='follwerImg' />
                    <div className="name">
                        <span>{follower.name}</span>
                        <span>@{follower.username}</span>
                    </div>
                </div>
            <button className='button fc-button'>
                Follow
            </button>
            </div>
        )
      })}
    </div>
  )
}

export default FolloweresCard
