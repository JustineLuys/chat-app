import { validationResult } from 'express-validator'
import {
  BAD_REQUEST_ERROR_CODE,
  STATUS_OK_SUCCESS_CODE,
  UNAUTHORIZED_ERROR_CODE,
} from '../../lib/constants/statusCodes.js'
import {
  constructPayload,
  createErrorClass,
  createUserObj,
  createValidationErrorMessage,
} from '../../lib/utils/helpers.js'
import { hashPassword } from '../../lib/secruity/auth.js'
import {
  createUserModel,
  saveUserToDb,
} from '../../lib/db/services/userDbService.js'
import { asyncHandler } from '../../lib/handlers/asyncHandler.js'
import { generateToken } from '../../lib/secruity/token.js'
import cloudinary from '../../lib/configurations/cloudinary.js'
import User from '../../models/User.js'

export const signup = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const validationErrorMessage = createValidationErrorMessage(errors)
    return next(
      createErrorClass(validationErrorMessage, BAD_REQUEST_ERROR_CODE)
    )
  }
  const { email, fullName, password } = req.body
  const hashedUserPassword = await hashPassword(password)
  const newUserObj = createUserObj(email, fullName, hashedUserPassword)

  const newUser = createUserModel(newUserObj)

  const savedUser = await saveUserToDb(newUser)
  const payload = constructPayload(
    savedUser.email,
    savedUser._id.toString(),
    Math.floor(Date.now() / 1000)
  )

  generateToken(payload, res)
  res.status(STATUS_OK_SUCCESS_CODE).json({
    success: true,
    data: savedUser,
  })
})

export const login = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const validationErrorMessage = createValidationErrorMessage(errors)
    return next(
      createErrorClass(validationErrorMessage, UNAUTHORIZED_ERROR_CODE)
    )
  }
  const payload = constructPayload(
    req.user.email,
    req.user._id.toString(),
    Math.floor(Date.now() / 1000)
  )

  generateToken(payload, res)

  res.status(STATUS_OK_SUCCESS_CODE).json({
    success: true,
    data: req.user,
  })
})

export const logout = asyncHandler((req, res, next) => {
  res.cookie('jwt', '', {
    maxAge: 0,
  })
  res.status(STATUS_OK_SUCCESS_CODE).json({
    message: 'Logged out successfully',
  })
})

export const updateProfile = asyncHandler(async (req, res, next) => {
  const { profilePic } = req.body
  if (!profilePic) {
    return next(
      createErrorClass('Profile pic is required', BAD_REQUEST_ERROR_CODE)
    )
  }
  const uploadResponse = await cloudinary.uploader.upload(profilePic)
  const userId = req.user._id

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profilePic: uploadResponse.secure_url },
    { new: true }
  )

  res.status(STATUS_OK_SUCCESS_CODE).json({
    success: true,
    data: updatedUser,
  })
})

export const checkAuth = asyncHandler((req, res, next) => {
  res.status(STATUS_OK_SUCCESS_CODE).json({
    success: true,
    data: req.user,
  })
})
