const MessageModel = require('../models/messageModel')

module.exports.doMessage = async (req, res, next) => {
  console.log(req.body)
  const newMessage = new MessageModel(req.body)
  try {
    const savedMessage = await newMessage.save()
    res.status(201).json({ status: true, savedMessage, message: 'message sended' })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.getMessage = async (req, res, next) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId
    })
    res.status(201).json({ status: true, messages, message: 'get messages' })
  } catch (error) {

  }
}
