const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserModel = require('../models/userModel')
const PostModel = require('../models/postModel')

const twilioController = require('../controllers/twilioControllers')

const getUser = async (token) => {
  try {
    const jwtToken = jwt.verify(token, process.env.TOKEN_KEY)
    const userID = jwtToken.userId
    const user = await UserModel.findOne({ _id: userID })
    return user
  } catch (error) {
    console.log(error)
  }
}

module.exports.signup = async (req, res, next) => {
  try {
    const userVerify = await UserModel.findOne({
      $or: [
        { email: req.body.email },
        { mobile: req.body.mobile }
      ]
    })
    if (userVerify) {
      res.status(401).json({
        status: 'Email or mobile number already exist'
      })
    } else {
      console.log('to otp')
      const data = await twilioController.doSms(req.body)
      console.log(data, 'otp')
      if (data) {
        res.status(201).json({
          status: 'otp generated'
        })
      }
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports.verifyUser = async (req, res, next) => {
  try {
    const result = await twilioController.otpVerify(req.body.otp, req.body.userData.mobile)
    if (result) {
      const userData = req.body.userData
      const salt = await bcrypt.genSalt(10)
      userData.password = await bcrypt.hash(userData.password, salt)
      userData.confirmPassword = await bcrypt.hash(userData.confirmPassword, salt)
      userData.Active = true
      await UserModel.create(userData)
      res.status(201).json({
        status: 'signup completed'
      })
    } else {
      res.status(401).json({
        status: 'otp verification failed'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const maxAge = 60 * 60 * 24
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (user) {
      if (user.Active) {
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (passwordCheck) {
          const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: maxAge })
          res.cookie('jwt', token, {
            withCrdentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
          })
          res.status(201).json({ Id: user._id, name: user.name, email: user.email, mobile: user.mobile, profile: user.profilePicture, cover: user.coverPicture, education: user.education, worksAt: user.worksAt, city: user.city, relation_status: user.relation_status, following: user.following })
        } else {
          res.status(401).json({ status: 'inavalid password' })
        }
      } else {
        res.status(401).json({ status: 'user have been blocked' })
      }
    } else {
      res.status(401).json({ status: 'inavalid email' })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports.getUserData = async (req, res, next) => {
  try {
    const user = await getUser(req.cookies.jwt)
    res.status(201).json({ Id: user._id, name: user.name, email: user.email, mobile: user.mobile, profile: user.profilePicture, cover: user.coverPicture, education: user.education, worksAt: user.worksAt, city: user.city, relation_status: user.relation_status, following: user.following })
  } catch (error) {
    console.log(error)
  }
}

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find()
    res.status(201).json({ users })
  } catch (error) {

  }
}

module.exports.followUser = async (req, res, next) => {
  const user = await getUser(req.cookies.jwt)
  const followUserId = req.body.userId
  await UserModel.updateOne({ _id: user._id }, {
    $push: {
      following: mongoose.mongo.ObjectId(followUserId)
    }
  })
}

module.exports.unfollowUser = async (req, res, next) => {
  const user = await getUser(req.cookies.jwt)
  const followUserId = req.body.userId
  await UserModel.updateOne({ _id: user._id }, {
    $pull: {
      following: mongoose.mongo.ObjectId(followUserId)
    }
  })
}

module.exports.getUser = async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.params.userId })
  res.status(201).json({ user })
}
