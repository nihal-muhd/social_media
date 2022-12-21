const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'provide user id of post owner']
  },
  desc: String,
  likes: [],
  imageUrl: String,
  comments: [
    {
      username: String,
      comment: String
    }
  ]

},
{
  timestamps: true
})

const PostModel = mongoose.model('post', postSchema)
module.exports = PostModel
