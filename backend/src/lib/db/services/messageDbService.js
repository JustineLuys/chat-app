import Message from '../../../models/Message.js'

export const createMessage = (messageData) => {
  return new Message(messageData)
}

export const saveMessageToDb = async (newMessage) => {
  return await newMessage.save()
}
