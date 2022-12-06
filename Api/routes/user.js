const express = require('express')
const router = express.Router()
const { signup, verifyUser, login, postUpload, getPost } = require('../controllers/userControllers')

router.post('/signup', signup)
router.post('/verify-user', verifyUser)
router.post('/login', login)
router.post('/post-upload', postUpload)
router.get('/get-post', getPost)

module.exports = router