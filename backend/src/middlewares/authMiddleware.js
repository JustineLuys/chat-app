import jwt from 'jsonwebtoken'
import { createErrorClass } from '../lib/utils/helpers.js'
import {
  NOT_FOUND_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} from '../lib/constants/statusCodes.js'
import { asyncHandler } from '../lib/handlers/asyncHandler.js'
import config from '../core/config.js'
import { getUserById } from '../lib/db/services/userDbService.js'

export const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    return next(
      createErrorClass(
        'Unauthorized - No Token Provided',
        UNAUTHORIZED_ERROR_CODE
      )
    )
  }
  const decodedToken = jwt.verify(token, config.SECRET_KEY)
  if (!decodedToken) {
    return next(
      createErrorClass('Unauthorized - Invalid Token', UNAUTHORIZED_ERROR_CODE)
    )
  }
  const user = await getUserById(decodedToken.id)

  if (!user) {
    return next(createErrorClass('User not found', NOT_FOUND_ERROR_CODE))
  }
  req.user = user
  next()
})
