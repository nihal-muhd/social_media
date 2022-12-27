const express = require('express')
const router = express.Router()

const { doMessage, getMessage } = require('../controllers/messageControllers')
const { newConversation, getConversation } = require('../controllers/conversationControllers')
const { updateProfile, updateCover, updateInfo, getProfilePost } = require('../controllers/profileControllers')
const { postUpload, getPost, likePost, unlikePost, commentPost, deletePost } = require('../controllers/postControllers')
const { signup, verifyUser, login, getUserData, getUsers, followUser, unfollowUser, getUser } = require('../controllers/userControllers')

// User Data
router.get('/getUserData', getUserData)
router.get('/get-users', getUsers)
router.get('/get-user/:userId', getUser)

// signup
router.post('/signup', signup)
router.post('/verify-user', verifyUser)

// Login
router.post('/login', login)

// Post
router.post('/post-upload', postUpload)
router.post('/get-post', getPost)
router.post('/like-post', likePost)
router.post('/unlike-post', unlikePost)
router.post('/comment-post', commentPost)
router.post('/delete-post', deletePost)

// Profile
router.post('/profile-picture', updateProfile)
router.post('/cover-picture', updateCover)
router.post('/info-update', updateInfo)
router.post('/get-profilePost', getProfilePost)

// Follow & Unfollow
router.post('/follow-users', followUser)
router.post('/unfollow-users', unfollowUser)

// Conversation
router.post('/conversation', newConversation)
router.get('/conversation/:userId', getConversation)

// Message
router.post('/message', doMessage)
router.get('/message/:conversationId', getMessage)

module.exports = router
