import React, { useState, useRef } from 'react'
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons'
import ProfileImg from '../../img/defaultProfile.png'
import { useSelector } from 'react-redux'
import axiosImage from '../../instance/imageUpload'
import SpinnerIcon from '@rsuite/icons/legacy/Spinner'
import axios from 'axios'
import './PostShare.css'

const PostShare = () => {
  const imageRef = useRef()
  const desc = useRef()
  const { user } = useSelector((state) => state.user)
  // const userId = user.Id

  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  // const [post, setPost] = useState(null)

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0]
      setImage(img)
    }
  }

  const handleShare = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log('handle share')

    const newPost = {
      userId: user.Id,
      desc: desc.current.value
    }
    if (image) {
      console.log('with image')
      const data = new FormData()
      const filename = Date.now() + image.name
      data.append('name', filename)
      data.append('file', image)
      data.append('upload_preset', 'weshare_images')
      axiosImage.post('/image/upload', data).then((res) => {
        newPost.imageUrl = res.data.secure_url
        axios.post('http://localhost:5000/post-upload', newPost, { withCredentials: true })
        setImage(null)
        setLoading(false)
        desc.current.value = ''
      })
    } else {
      console.log('description only')
      axios.post('http://localhost:5000/post-upload', newPost, { withCredentials: true })
      setLoading(false)
      desc.current.value = ''
    }
  }

  // useEffect(() => {
  //   const getPost = async () => {
  //     const posts = await axios.post('http://localhost:5000/get-post', { userId }, { withCredentials: true })
  //     console.log(posts.data.post, 'new post data')
  //     setPost(posts.data.post)
  //   }
  //   getPost()
  // }, [userId])

  return (
    <div className='PostShare'>
      <img src={user.profile ? user.profile : ProfileImg} alt="" />
      <div>
        <input type="text" placeholder='Write something here...' ref={desc} required />
        <div className="postOptions">
          <div className="option" style={{ color: 'var(--photo)' }} onClick={() => imageRef.current.click()}>
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: 'var(--video)' }}>
            <UilPlayCircle />
            Vedio
          </div>
          <div className="option" style={{ color: 'var(--location)' }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: 'var(--schedule)' }}>
            <UilSchedule />
            Schedule
          </div>
          {loading ? <SpinnerIcon pulse style={{ fontSize: '2em' }} /> : <button className='button ps-button' onClick={handleShare}>Share</button>}

          <div style={{ display: 'none' }}>
            <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostShare
