import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Modal, useMantineTheme } from '@mantine/core'
import axios from 'axios'

function ProfileModal ({ modalOpen, setModalOpen }) {
  const theme = useMantineTheme()

  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({ name: user.name ? user.name : '', education: user.education ? user.education : '', worksAt: user.workAt ? user.workAt : '', city: user.city ? user.city : '', relation_status: user.relation_status ? user.relation_status : '' })
  const userId = user.Id

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post('http://localhost:5000/info-update', { formData, userId }, { withCredentials: true })
    if (response.status === 201) {
      navigate('/profile/' + user.Id)
    } else {
      console.log('user detail not updated')
    }
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      // opened is a property of modal. Here when our state modalOpen is true this modal will open.
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        <div>
          <input type="text" className="infoInput" name='name' placeholder='Your name' onChange={handleChange} defaultValue={user.name ? user.name : ''} />

        </div>
        <div>
          <input type="text" className="infoInput" name='education' placeholder='Your Education' onChange={handleChange} defaultValue={user.education ? user.education : ''} />
          <input type="text" className="infoInput" name='worksAt' placeholder='works @ ' onChange={handleChange} defaultValue={user.worksAt ? user.worksAt : ''} />
        </div>
        <div>
          <input type="text" className="infoInput" name='city' placeholder='city ' onChange={handleChange} defaultValue={user.city ? user.city : ''} />
          <input type="text" className="infoInput" name='relation_status' placeholder='relationship status' onChange={handleChange} defaultValue={user.relation_status ? user.relation_status : ''} />
        </div>

        <button className='button infoButton' onClick={() => setModalOpen(false)}>Update</button>

      </form>
    </Modal>
  )
}

export default ProfileModal
