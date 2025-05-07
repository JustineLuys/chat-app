import { Router } from 'express'
import { protectRoute } from '../../middlewares/authMiddleware.js'
import {
  displayMessages,
  sendMessage,
} from '../../controllers/messages/controller.js'

const messagesRouter = Router()

messagesRouter.get('/:id', protectRoute, displayMessages)
messagesRouter.post('/send/:id', protectRoute, sendMessage)
export default messagesRouter
