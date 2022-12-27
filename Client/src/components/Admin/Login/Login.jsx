import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({ adminId: '', password: '' })
  const [error, setError] = useState('')
  const { adminId, password } = formData
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies([])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.adminId === '' || formData.password === '') {
      setError('Enter above details')
    } else {
      const response = await axios.post('http://localhost:5000/admin/login', formData, { withCredentials: true })
      if (response.status === 201) {
        navigate('/admin')
      } else {
        setError('incorrect username or password')
      }
    }
  }

  useEffect(() => {
    if (cookies.adminjwt) {
      navigate('/admin')
    }
  })

  return (
    <div className='auth'>
      <div className="auth-left">
        <div className='auth-logo admin'>WeShare <br></br> <div className='panel'>Admin Panel</div> </div>
      </div>
      <div className="auth-right">
        <form className='infoForm authform' onSubmit={handleSubmit}>
          <h3>Admin Login</h3>

          <div>
            <input type="text" placeholder='username' className="infoInput" name='adminId' onChange={handleChange} value={adminId} />

          </div>
          <div>
            <input type="password" placeholder='Password' className='infoInput' name='password' onChange={handleChange} value={password} />

          </div>
          {error && <p style={{ color: 'red' }} className='error-form'>{error}</p>}
          <div>
          </div>
           <button className='button infoButton' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
