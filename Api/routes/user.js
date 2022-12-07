const express = require('express')
const router = express.Router()
const { signup, verifyUser, login, getUserData, postUpload, getPost, likePost, unlikePost, updateProfile, updateCover } = require('../controllers/userControllers')

router.post('/signup', signup)
router.post('/verify-user', verifyUser)
router.post('/login', login)
router.get('/getUserData', getUserData)
router.post('/post-upload', postUpload)
router.get('/get-post', getPost)
router.post('/like-post', likePost)
router.post('/unlike-post', unlikePost)
router.post('/profile-picture', updateProfile)
router.post('/cover-picture', updateCover)

module.exports = router