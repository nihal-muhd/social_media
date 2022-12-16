import React from 'react'
import profile from '../../img/defaultProfile.png'

const Conversation = () => {
    return (
        <>
            <div className='follower conversation'>
                <div>
                    <div className="online-dot"></div>
                    <img src={profile} alt="" className='followerImage' style={{ width: '50px', height: '50px' }} />
                    <div className="name" style={{ fontSize: '0.8rem' }}>
                        <span>shamon thayyib</span>
                        <span>online</span>
                    </div>

                </div>
            </div>
            <hr style={{width:'85%',border:'0.1px solid #ececec'}}/>
        </>
    )
}

export default Conversation
