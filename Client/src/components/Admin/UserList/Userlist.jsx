import React, { useState, useEffect } from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const Userlist = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    async function getUsers () {
      const userData = await axios.get('http://localhost:5000/admin/getUser', { withCredentials: true })
      if (userData.status === 200) {
        setUser(userData.data.users)
      } else {
        alert('error occured')
      }
    }
    getUsers()
  }, [user])

  const blockUser = async (userID) => {
    const blockUser = await axios.post('http://localhost:5000/admin/blockUser', { userID }, { withCredentials: true })
    if (blockUser.data.blockstatus === true) {
      setUser((user) => {
        user.map((val) => {
          if (val._id === userID) {
            return { ...val, Active: false }
          }
          return val
        })
      })
    }
  }

  const unblockUser = async (userID) => {
    const unblockUser = await axios.post('http://localhost:5000/admin/unblockUser', { userID }, { withCredentials: true })
    if (unblockUser.data.unblockstatus === true) {
      setUser((user) => {
        user.map((val) => {
          if (val._id === userID) {
            return { ...val, Active: true }
          }
          return val
        })
      })
    }
  }

  return (
    <React.Fragment>
    <div className='userTable-main'>
        <div className="usersList">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {user?.map((obj, index, id) => {
                      return (
                            <tr key={id}>
                                <td>{index + 1}</td>
                                <td>{obj.name}</td>
                                <td>{obj.email}</td>
                                <td>{obj.mobile}</td>
                                <td>{obj.Active ? 'Active' : 'Blocked'}</td>
                                <td>{obj.Active
                                  ? <Button variant="danger" onClick={() => { if (window.confirm('Do you want to block this user?')) { blockUser(obj._id) } }} >Block</Button>
                                  : <Button variant="warning" onClick={() => { if (window.confirm('Do you want to unblock this user?')) { unblockUser(obj._id) } }} >Unblock</Button>}
                                </td>

                            </tr>
                      )
                    })}

                </tbody>
            </Table>
        </div>
    </div>

</React.Fragment>
  )
}

export default Userlist
