import { Router } from 'express'
import authRouter from './auth/route.js'
import messagesRouter from './messages/route.js'
import usersRouter from './users/route.js'

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/messages', messagesRouter)
apiRouter.use('/users', usersRouter)
export default apiRouter
