import React from 'react'
import { UilPen } from '@iconscout/react-unicons'
import { useState } from 'react'
import ProfileModal from '../../components/ProfileModal/ProfileModal'
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/userSlice';
import './InfoCard.css'

const InfoCard = () => {
    const navigate = useNavigate()
    const [cookie, setCookie, removeCookie] = useCookies([])
    const dispatch = useDispatch()

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
                    <b>Status </b>
                </span>
                <span>single</span>
            </div>
            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>Calicut</span>
            </div>
            <div className="info">
                <span>
                    <b>works at </b>
                </span>
                <span>Brototype</span>
            </div>

            <button className='button logout-button' onClick={Logout}>Logout</button>
        </div>
    )
}

export default InfoCard
