import React from 'react'
import Navbar from '../../../components/Admin/Navbar/Navbar'
import Sidebar from '../../../components/Admin/Sidebar/Sidebar'
import './AdminHome.css'

const AdminHome = () => {
  return (
    <div>
      <Navbar />
      <div className='adminhome-main'>
        <div className='adminhome-sidebar'>
          <Sidebar />
        </div>
        <div className='adminhome-graph'>
          {/* <AdminGraph /> */}
          Admin Home
        </ div>
      </div>
    </div>
  )
}

export default AdminHome
