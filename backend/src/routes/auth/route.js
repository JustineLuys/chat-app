import { Router } from 'express'
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from '../../controllers/auth/controller.js'
import {
  validateLogin,
  validateSignUp,
} from '../../validators/authBodyValidators.js'
import { protectRoute } from '../../middlewares/authMiddleware.js'

const authRouter = Router()

authRouter.post('/signup', ...validateSignUp, signup)
authRouter.post('/login', ...validateLogin, login)
authRouter.post('/logout', logout)
authRouter.put('/update-profile', protectRoute, updateProfile)
authRouter.get('/check', protectRoute, checkAuth)

export default authRouter
