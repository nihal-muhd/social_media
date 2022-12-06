import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import './Otp.css'

const Otp = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [otp, setOtp] = useState(null)
    const [error, setError] = useState('')

    const userData = location.state

    useEffect(() => {
        if (!location.state?.mobile) {
            navigate('/login')
        }
    }, [])

    const handleChange = (e) => {
        setError('')
        setOtp(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (otp === null) {
            setError('**enter otp')
        } else if (otp.length !== 4) {
            setError('**invalid otp')
        } else {
            console.log(otp)
            let data = await axios.post('http://localhost:5000/verify-user', { otp, userData }, { withCredentials: true })
            if(data.status===201){
                toast.success("otp verified succesfully")
                navigate('/login')
            }else{
                setError('**otp verification failed')
            }
        }
    }


    return (
        <div className='auth'>
            <form className='infoForm authform' onSubmit={handleSubmit}>
                <h3>Otp Verification</h3>
                <div>
                    <span style={{ fontSize: '12px' }} >otp has been sent to +91*******456</span>
                </div>
                <div>
                    <input type="number" placeholder='enter otp' className='infoInput' name='otp' onChange={handleChange} />
                </div>
                {error && <p style={{ color: 'red' }} className='error-form'>{error}</p>}
                <button className='button otp-btn' type='submit'>submit</button>
            </form>
        </div>
    )
}

export default Otp
