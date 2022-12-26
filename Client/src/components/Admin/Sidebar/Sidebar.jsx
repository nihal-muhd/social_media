import React from 'react'
import { BsHouseFill, BsPeopleFill, BsBoxArrowRight } from 'react-icons/bs'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate()
  const [cookie, setCookie, removeCookie] = useCookies([])

  const adminHome = () => {
    navigate('/admin')
  }

  const adminuserList = () => {
    navigate('/admin/user-list')
  }

  const Logout = () => {
    removeCookie('adminjwt')
    navigate('/admin/login')
  }
  return (
        <div className='adminsidebar-main '>
            <div className="adminsidebar-options">
                <div className='adminsidebar-text' onClick={adminHome}>    <BsHouseFill /> Home</div>
            </div>
            <div className="adminsidebar-options">
                <div className='adminsidebar-text' onClick={adminuserList}>  <BsPeopleFill />  Users List</div>
            </div>

            <div className="adminsidebar-options">
                <div className='adminsidebar-text' onClick={Logout} >  <BsBoxArrowRight />  Logout</div>
            </div>
        </div>
  )
}

export default Sidebar
