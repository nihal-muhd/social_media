const express = require('express')
const router = express.Router()
const { signup, verifyUser, login, getUserData, postUpload, getPost, likePost, unlikePost, updateProfile, updateCover, updateInfo, deletePost, commentPost, getUsers,followUser } = require('../controllers/userControllers')

router.get('/getUserData', getUserData)
router.get('/get-users', getUsers)

router.post('/signup', signup)
router.post('/verify-user', verifyUser)
router.post('/login', login)
router.post('/post-upload', postUpload)
router.post('/get-post', getPost)
router.post('/like-post', likePost)
router.post('/unlike-post', unlikePost)
router.post('/profile-picture', updateProfile)
router.post('/cover-picture', updateCover)
router.post('/info-update', updateInfo)
router.post('/delete-post', deletePost)
router.post('/comment-post', commentPost)
router.post('/follow-users',followUser)

module.exports = router