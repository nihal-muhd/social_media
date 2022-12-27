import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

import './Signup.css'

const Signup = () => {
  return (
        <div className='auth'>
            <div className="auth-left">
                <div className='auth-logo'>WeShare</div>
            </div>
            <SignupForm />
        </div>
  )
}

function SignupForm () {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { name, email, mobile, password, confirmPassword } = formData

  const handleChange = (e) => {
    setError('')
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    /* Signup validation */
    if (formData.name === '' || formData.email === '' || formData.mobile === '' || formData.password === '' || formData.confirmPassword === '') {
      setError('**please fill the form')
    } else if ((formData.name.length <= 2 && formData.name.length > 20) || (!formData.name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/))) {
      setError('Invalid name')
    } else if ((formData.email.indexOf('@') <= 0) || ((formData.email.charAt(formData.email.length - 4) !== '.') && (formData.email.charAt(formData.email.length - 3) !== '.'))) {
      setError('**invalid email format')
    } else if ((formData.mobile.length < 10 || formData.mobile.length > 10) && (!formData.mobile.match(/^[0-9]{10}$/))) {
      setError('**Enter valid mobile number')
    } else if (formData.password.length < 6 || formData.password.length > 15) {
      setError('**password length should be between 6 and 15')
    } else if (formData.password !== formData.confirmPassword) {
      setError('**password doesnt match')
    } else {
      const data = await axios.post('http://localhost:5000/signup', formData)
      if (data.status === 201) {
        navigate('/verify-user', { state: { name: formData.name, email: formData.email, mobile: formData.mobile, password: formData.password, confirmPassword: formData.confirmPassword } })
      } else {
        setError('Email or mobile number already exist')
      }
    }
  }

  return (
        <div className="auth-right">
            <form className='infoForm authform' onSubmit={handleSubmit}>
                <h3>Sign up</h3>
                <div>
                    <input type="text" placeholder='Full name' className='infoInput' name='name' onChange={handleChange} value={name} />
                </div>
                <div>
                    <input type="email" placeholder='Email' className="infoInput" name='email' onChange={handleChange} value={email} />
                    <input type="tel" placeholder='Mobile Number' className="infoInput" name='mobile' onChange={handleChange} value={mobile} />
                </div>
                <div>
                    <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='infoInput' name='password' onChange={handleChange} value={password} />
                    {showPassword ? <BsFillEyeFill onClick={() => setShowPassword(false)} /> : <BsFillEyeSlashFill onClick={() => setShowPassword(true)} />}
                    <input type="password" placeholder='Confirm password' className='infoInput' name='confirmPassword' onChange={handleChange} value={confirmPassword} />

                </div>
                {error && <p style={{ color: 'red' }} className='error-form'>{error}</p>}
                <div>
                    <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>     <span style={{ fontSize: '12px' }} onClick={() => navigate('/login')}>Already have account?</span></Link>
                </div>
                <button className='button infoButton' type='submit'>Signup</button>
            </form>
        </div>
  )
}

export default Signup
