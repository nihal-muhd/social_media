import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UilTimes } from '@iconscout/react-unicons'
import axios from 'axios'

import axiosImage from '../../instance/imageUpload'
import cover from '../../img/cover.jpg'
import profile from '../../img/defaultProfile.png'

import './ProfileCard.css'

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.user)
  const profileRef = useRef()
  const coverRef = useRef()

  const [profilePic, setProfilePic] = useState(null)
  const [coverPic, setCoverPic] = useState(null)

  const handleProfile = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0]
      setProfilePic(img)
    }
  }

  const handleCover = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0]
      setCoverPic(img)
    }
  }

  const shareProfile = () => {
    const profileData = {
      userId: user.Id
    }
    const data = new FormData()
    const filename = Date.now() + profilePic.name
    data.append('name', filename)
    data.append('file', profilePic)
    data.append('upload_preset', 'weshare_images')
    axiosImage.post('/image/upload', data).then((res) => {
      profileData.profileurl = res.data.secure_url
      axios.post('http://localhost:5000/profile-picture', { profileData }, { withCredentials: true })
      setCoverPic(null)
    })
  }

  const shareCover = () => {
    const profileData = {
      userId: user.Id
    }
    const data = new FormData()
    const filename = Date.now() + coverPic.name
    data.append('name', filename)
    data.append('file', coverPic)
    data.append('upload_preset', 'weshare_images')
    axiosImage.post('/image/upload', data).then((res) => {
      profileData.coverurl = res.data.secure_url
      axios.post('http://localhost:5000/cover-picture', { profileData }, { withCredentials: true })
      setCoverPic(null)
    })
  }

  return (
        <div className='ProfileCard'>
            <div style={{ display: 'none' }}>
                <input type="file" name='profile' ref={profileRef} onChange={handleProfile} />
                <input type="file" name='cover' ref={coverRef} onChange={handleCover} />
            </div>
            <div className="ProfieImages">
                <img src={user.cover ? user.cover : cover} alt="" style={{ cursor: 'pointer' }} onClick={() => coverRef.current.click()} />
                <img src={user.profile ? user.profile : profile} alt="" style={{ cursor: 'pointer' }} onClick={() => profileRef.current.click()} />
            </div>

            {profilePic && (
                <div className="previewImage">
                    <UilTimes onClick={() => setProfilePic(null)} />
                    <img src={URL.createObjectURL(profilePic)} alt="" />
                    <button className='button infoButton' onClick={shareProfile}>share</button>
                </div>
            )}

            {coverPic && (
                <div className="previewImage">
                    <UilTimes onClick={() => setCoverPic(null)} />
                    <img src={URL.createObjectURL(coverPic)} alt="" />
                    <button className='button infoButton' onClick={shareCover}>share</button>
                </div>
            )}
            <div className="ProfileName">
                <span>{user.name}</span>
                <span>{user.worksAt ? user.worksAt : 'works at....?'}</span>
            </div>
            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{user.followings ? user.followings : 0}</span>
                        <span>Following</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user.followerss ? user.followerss : 0}</span>
                        <span>Followers</span>
                    </div>
                    {location === 'profilepage' && (
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
            {location === 'profilepage'
              ? (
                  ''
                )
              : (
                <span >
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${user.Id}`}>   My Profile</Link>
                </span>
                )}

        </div>
  )
}

export default ProfileCard
