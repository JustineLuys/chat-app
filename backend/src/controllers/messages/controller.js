import cloudinary from '../../lib/configurations/cloudinary.js'
import { getReceiverSocketId, io } from '../../lib/connections/socket.js'
import { STATUS_OK_SUCCESS_CODE } from '../../lib/constants/statusCodes.js'
import {
  createMessage,
  saveMessageToDb,
} from '../../lib/db/services/messageDbService.js'
import { asyncHandler } from '../../lib/handlers/asyncHandler.js'
import Message from '../../models/Message.js'

export const displayMessages = asyncHandler(async (req, res, next) => {
  const userToChatId = req.params.id
  const myId = req.user._id
  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  })
  res.status(STATUS_OK_SUCCESS_CODE).json({
    succes: true,
    data: messages,
  })
})

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { text, image } = req.body
  const { id: receiverId } = req.params
  const senderId = req.user._id

  let imageUrl
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image)
    imageUrl = uploadResponse.secure_url
  }
  const messageData = {
    senderId,
    receiverId,
    text,
    image: imageUrl,
  }
  const newMessage = createMessage(messageData)
  const savedMessage = await saveMessageToDb(newMessage)

  // Getting the socket id of receiver id from userSocketMap
  const receiverSocketId = getReceiverSocketId(receiverId)
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', newMessage)
  }

  res.status(STATUS_OK_SUCCESS_CODE).json({
    success: true,
    data: savedMessage,
  })
})
