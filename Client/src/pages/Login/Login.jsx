import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/userSlice';
import { useCookies } from 'react-cookie'
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';


const Login = () => {
    return (
        <div className='auth'>
            <div className="auth-left">
                <div className='auth-logo'>WeShare</div>
            </div>
            <LoginForm />
        </div>
    )
}

function LoginForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [cookies, setCookies] = useCookies([])

    const { user, loading } = useSelector((state) => state.user)


    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const { email, password } = formData

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (formData.email === '' || formData.password === '') {
            setError('Please fill the form')
        } else if ((formData.email.indexOf('@') <= 0) || ((formData.email.charAt(formData.email.length - 4) !== '.') && (formData.email.charAt(formData.email.length - 3) !== '.'))) {
            setError('**invalid email format')
        } else if (formData.password.length < 6 || formData.password.length > 15) {
            setError('**password format is wrong')
        } else {
            dispatch(userLogin(formData))
        }
    }

    useEffect(() => {
        if (cookies.jwt || user) {
            navigate('/')
        }
    }, [user])

    return (
        <div className="auth-right">
            <form className='infoForm authform' onSubmit={handleSubmit}>
                <h3>Login</h3>

                <div>
                    <input type="email" placeholder='Email' className="infoInput" name='email' onChange={handleChange} value={email} />

                </div>
                <div>
                    <input type="password" placeholder='Password' className='infoInput' name='password' onChange={handleChange} value={password} />

                </div>
                {error && <p style={{ color: 'red' }} className='error-form'>{error}</p>}
                <div>
                    <Link to='/signup'>    <span style={{ fontSize: '12px' }}>Don't have an account?</span> </Link>
                </div>
                {loading ? <SpinnerIcon pulse style={{ fontSize: '2em' }}/> : <button className='button infoButton' type='submit'>Login</button>}

            </form>
        </div>
    )
}

export default Login
