const express = require('express')
const router = express.Router()
const { signup, verifyUser, login, getUserData, postUpload, getPost, likePost, unlikePost, updateProfile, updateCover, updateInfo, deletePost, commentPost, getUsers, followUser, unfollowUser, getProfilePost,getUser } = require('../controllers/userControllers')
const { newConversation, getConversation } = require('../controllers/conversationControllers')
const { doMessage, getMessage } = require('../controllers/messageControllers')

router.get('/getUserData', getUserData)
router.get('/get-users', getUsers)
router.get('/get-user/:userId',getUser)

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
router.post('/follow-users', followUser)
router.post('/unfollow-users', unfollowUser)
router.post('/get-profilePost', getProfilePost)

router.post('/conversation', newConversation)
router.get('/conversation/:userId', getConversation)

router.post('/message', doMessage)
router.get('/message/:conversationId', getMessage)

module.exports = router