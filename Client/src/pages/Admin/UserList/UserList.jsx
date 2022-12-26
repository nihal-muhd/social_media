import React from 'react'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import Userlist from '../../../components/Admin/UserList/Userlist'
import './UserList.css'

const UserList = () => {
  return (
    <div>
      <Navbar />
      <div className='adminUser-main'>
        <div className='adminUser-sidebar'>
          <Sidebar />
        </div>
        <div className='adminhome-graph'>
          <Userlist />
        </ div>
      </div>
    </div>
  )
}

export default UserList
