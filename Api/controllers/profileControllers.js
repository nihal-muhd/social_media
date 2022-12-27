const mongoose = require('mongoose')

const UserModel = require('../models/userModel')
const PostModel = require('../models/postModel')

module.exports.updateProfile = async (req, res, next) => {
  try {
    const profileURL = req.body.profileData.profileurl
    const userId = req.body.profileData.userId
    await UserModel.updateOne({ _id: userId }, {
      $set: {
        profilePicture: profileURL
      }
    })
    res.status(201).json({ status: 'success' })
  } catch (error) {

  }
}

module.exports.updateCover = async (req, res) => {
  try {
    const coverURL = req.body.profileData.coverurl
    const userId = req.body.profileData.userId
    await UserModel.updateOne({ _id: userId }, {
      $set: {
        coverPicture: coverURL
      }
    })
    res.status(201).json({ status: 'success' })
  } catch (error) {

  }
}

module.exports.updateInfo = async (req, res, next) => {
  try {
    const info = req.body.formData
    const userId = req.body.userId
    await UserModel.updateOne({ _id: userId }, {
      $set: {
        name: info.name,
        education: info.education,
        worksAt: info.worksAt,
        city: info.city,
        relation_status: info.relation_status
      }
    })
    res.status(201).json({ status: 'success' })
  } catch (error) {

  }
}

module.exports.getProfilePost = async (req, res, next) => {
  const userId = req.body.userId
  const mypost = await PostModel.aggregate([
    {
      $match: { userId: mongoose.mongo.ObjectId(userId) }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'result'
      }
    },
    {
      $unwind: '$result'
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        desc: 1,
        likes: 1,
        imageUrl: 1,
        createdAt: 1,
        user_name: '$result.name',
        comments: 1
      }
    }

  ]).sort({ createdAt: -1 })
  res.status(201).json({ mypost })
}
