const express = require('express')
const router = express.Router()
const { adminLogin, getUser, blockUser, unBlockUser } = require('../controllers/adminControllers')

router.post('/login', adminLogin)
router.get('/getUser', getUser)
router.post('/blockUser', blockUser)
router.post('/unblockUser', unBlockUser)

module.exports = router
