const express = require('express')
const router = express.Router()

const { adminLogin, getUser, blockUser, unBlockUser } = require('../controllers/adminControllers')

// Login
router.post('/login', adminLogin)

// User
router.get('/getUser', getUser)
router.post('/blockUser', blockUser)
router.post('/unblockUser', unBlockUser)

module.exports = router
