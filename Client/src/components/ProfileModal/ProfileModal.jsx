import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react'

function ProfileModal({ modalOpen, setModalOpen }) {
    const theme = useMantineTheme();

    const [fromData,setFormData]=useState({education:'',worksAt:'',city:'',relation_status:''})

    



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
            <form className="infoForm">
                <h3>Your Info</h3>
                <div>
                    <input type="text" className="infoInput" name='education' placeholder='Your Education' />
                    <input type="text" className="infoInput" name='worksAt' placeholder='works @ ' />
                </div>
                <div>
                    <input type="text" className="infoInput" name='city' placeholder='city ' />
                    <input type="text" className="infoInput" name='relation_status' placeholder='relationship status' />
                </div>
                <div>
                    Profile Image
                    <input type="file" name='profileImage' />
                    coverImage
                    <input type="file" name='coverImage' />
                </div>

                <button className='button infoButton'>Update</button>

            </form>
        </Modal>
    );
}

export default ProfileModal