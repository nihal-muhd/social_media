import React, { useState } from 'react'
import { UilPen } from '@iconscout/react-unicons'

import ProfileModal from '../../components/ProfileModal/ProfileModal'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/userSlice'
import './InfoCard.css'

const InfoCard = () => {
  const navigate = useNavigate()
  const [cookie, setCookie, removeCookie] = useCookies([])
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  const [modalOpen, setModalOpen] = useState(false)

  const Logout = () => {
    removeCookie('jwt')
    dispatch(logout())
    navigate('/login')
  }

  return (
        <div className='InfoCard'>
            <div className="infoHead">
                <h4>Your Info</h4>
                <div>

                    <UilPen width='2rem' height='1.2rem' onClick={() => setModalOpen(true)} />
                    <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
                </div>
            </div>
            <div className="info">
                <span>
                    <b>Went to </b>
                </span>
                <span>{user.education ? user.education : '......'}</span>
            </div>
            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>{user.city ? user.city : '......'} </span>
            </div>
            <div className="info">
                <span>
                    <b>Works @ </b>
                </span>
                <span>{user.worksAt ? user.worksAt : '......'} </span>
            </div>
            <div className="info">
                <span>
                    <b>status </b>
                </span>
                <span>{user.relation_status ? user.relation_status : '......'}</span>
            </div>

            <button className='button logout-button' onClick={Logout}>Logout</button>
        </div>
  )
}

export default InfoCard
