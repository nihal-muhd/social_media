const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

const adminDetails = {
  adminID: process.env.ADMIN_ID,
  password: process.env.ADMIN_PASSWORD
}

module.exports.adminLogin = async (req, res, next) => {
  try {
    const maxAge = 60 * 60 * 24
    const { adminId, password } = req.body
    if (adminId === adminDetails.adminID && password === adminDetails.password) {
      const adminToken = jwt.sign({ adminID: adminId }, process.env.TOKEN_KEY, { expiresIn: maxAge })
      res.cookie('adminjwt', adminToken, {
        withCrdentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000
      })
      res.status(201).json({ adminID: adminId, status: true })
    } else {
      res.status(401).json({ status: 'inavalid password or id' })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports.getUser = async (req, res, next) => {
  try {
    const users = await UserModel.find().lean()

    res.status(200).json({ users })
  } catch (error) {
    console.log(error)
  }
}

module.exports.blockUser = async (req, res, next) => {
  try {
    const userID = req.body.userID
    await UserModel.updateOne({ _id: userID }, {
      $set: {
        Active: false
      }
    })
    res.status(201).json({ blockstatus: true })
  } catch (error) {
    console.log(error)
  }
}

module.exports.unBlockUser = async (req, res, next) => {
  try {
    const userID = req.body.userID
    await UserModel.updateOne({ _id: userID }, {
      $set: {
        Active: true
      }
    })
    res.status(201).json({ unblockstatus: true })
  } catch (error) {
    console.log(error)
  }
}
