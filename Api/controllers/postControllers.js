const mongoose = require('mongoose')

const PostModel = require('../models/postModel')
const UserModel = require('../models/userModel')

module.exports.postUpload = async (req, res, next) => {
  try {
    const postData = req.body
    await PostModel.create(postData)
  } catch (error) {
    console.log(error)
  }
}

module.exports.getPost = async (req, res, next) => {
  try {
    const userId = req.body.userId
    const otherspost = await UserModel.aggregate([
      {
        $match: { _id: mongoose.mongo.ObjectId(userId) }
      },
      {
        $unwind: '$following'
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'following',
          foreignField: 'userId',
          as: 'otherpost'
        }
      },
      {
        $unwind: '$otherpost'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'otherpost.userId',
          foreignField: '_id',
          as: 'result'
        }
      },
      {
        $unwind: '$result'
      },
      {
        $project: {
          _id: 0,
          user_id: '$_id',
          follow_user_id: '$otherpost.userId',
          user_name: '$result.name',
          _id: '$otherpost._id',
          desc: '$otherpost.desc',
          likes: '$otherpost.likes',
          comments: '$otherpost.comments',
          imageUrl: '$otherpost.imageUrl',
          createdAt: '$otherpost.createdAt'
        }
      }

    ]).sort({ createdAt: -1 })
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
    const post = [...mypost, ...otherspost].sort((a, b) => b.createdAt - a.createdAt)
    res.status(201).json({ post })
  } catch (error) {
    console.log(error)
  }
}

module.exports.likePost = async (req, res, next) => {
  try {
    const postID = req.body.postId
    const userID = req.body.userId
    await PostModel.updateOne({ _id: postID }, {
      $push: {
        likes: userID
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports.unlikePost = async (req, res, next) => {
  try {
    const postID = req.body.postId
    const userID = req.body.userId
    await PostModel.updateOne({ _id: postID }, {
      $pull: {
        likes: userID
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports.commentPost = async (req, res, next) => {
  try {
    const postId = req.body.postId
    const comments = {
      username: req.body.username,
      comment: req.body.comment
    }
    await PostModel.updateOne({ _id: postId }, {
      $push: {
        comments
      }
    })
  } catch (error) {

  }
}

module.exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.body.postId
    await PostModel.deleteOne({ _id: postId })
  } catch (error) {

  }
}
