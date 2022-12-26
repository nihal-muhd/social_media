import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import './Login.css'
import axios from 'axios'

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
        <React.Fragment>
            <div className='signpage'>
                <div className='container '>
                    <div className='row d-flex justify-content-center '>
                        <div className='col-6 mt-5'>
                            <div>
                                <h2 className='head text-center '>WeShare</h2>
                                <h4 className='text-center '>Admin Panel</h4>
                            </div>
                            <div className='adminmain'>
                                <div className='form-part'>
                                    <Form onSubmit={handleSubmit}>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Username </Form.Label>
                                            <Form.Control type="text" placeholder=" username" name='adminId' onChange={handleChange} value={adminId} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} value={password} />
                                        </Form.Group>
                                        {error && <p style={{ color: 'red' }} className='error-form'>{error}</p>}

                                        <div className="d-grid gap-2">
                                            <Button className='btn mb-2' variant="secondary" type="submit" size="md">
                                                Log in
                                            </Button>
                                        </div >

                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
  )
}

export default Login
