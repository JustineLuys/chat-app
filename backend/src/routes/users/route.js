import { Router } from 'express'
import { displayAllUsers } from '../../controllers/users/controller.js'
import { protectRoute } from '../../middlewares/authMiddleware.js'

const usersRouter = Router()

usersRouter.get('/', protectRoute, displayAllUsers)
export default usersRouter
