import React from 'react'
import { useNavigate } from 'react-router-dom'
import cover from '../../img/cover.jpg'
import profile from '../../img/profileImg.jpg'
import './ProfileCard.css'

const ProfileCard = () => {
    const navigate=useNavigate()
    const ProfilePage = false
    return (
        <div className='ProfileCard'>
            <div className="ProfieImages">
                <img src={cover} alt="" />
                <img src={profile} alt="" />
            </div>
            <div className="ProfileName">
                <span>Nihal Muhammed</span>
                <span>Mern stack developer</span>
            </div>
            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>491</span>
                        <span>Following</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>1</span>
                        <span>Followers</span>
                    </div>
                    {ProfilePage && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>3</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {ProfilePage ? '':<span onClick={()=>navigate('/profile')}>
                My Profile
            </span>}

        </div>
    )
}

export default ProfileCard
