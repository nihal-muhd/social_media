const ConversationModel = require('../models/conversationModel')

module.exports.newConversation = async (req, res, next) => {
  const newConversation = new ConversationModel({
    members: [req.body.senderId, req.body.receiverId]
  })

  try {
    const savedConversation = await newConversation.save()
    res.status(200).json(savedConversation)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.getConversation = async (req, res, next) => {
  try {
    const conversation = await ConversationModel.find({
      members: { $in: [req.params.userId] }
    })
    res.status(201).json({ status: true, conversation, message: 'get conversation' })
  } catch (error) {
    res.status(500).json(error)
  }
}
