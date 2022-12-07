const express = require('express')
const router = express.Router()
const { signup, verifyUser, login, postUpload, getPost,likePost,unlikePost,updateProfile } = require('../controllers/userControllers')

router.post('/signup', signup)
router.post('/verify-user', verifyUser)
router.post('/login', login)
router.post('/post-upload', postUpload)
router.get('/get-post', getPost)
router.post('/like-post',likePost)
router.post('/unlike-post',unlikePost)
router.post('/profile-picture',updateProfile)

module.exports = router