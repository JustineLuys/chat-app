import { body } from 'express-validator'
import User from '../models/User.js'
import { createErrorClass } from '../lib/utils/helpers.js'
import { UNAUTHORIZED_ERROR_CODE } from '../lib/constants/statusCodes.js'
import { comparePassword } from '../lib/secruity/auth.js'
import { getUserByEmail } from '../lib/db/services/userDbService.js'

export const validateSignUp = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (value) => {
      const user = await getUserByEmail(value)
      if (user) {
        throw new Error(`${value} already in use`)
      }
    }),
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required')
    .trim()
    .isString()
    .withMessage('Full name must be a string')
    .isLength({
      min: 6,
    })
    .withMessage('Full name must be at least 6 characters long'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .trim()
    .isString()
    .withMessage('Password must be a string')
    .isLength({
      min: 6,
    })
    .withMessage('Password be at least 6 characters long'),
]

export const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .trim()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .trim()
    .isString()
    .withMessage('Password must be a string')
    .bail()
    .isLength({
      min: 6,
    })
    .withMessage('Password be at least 6 characters long')
    .bail()
    .custom(async (value, { req }) => {
      const user = await getUserByEmail(req.body.email)
      if (!user) {
        throw new Error('Invalid email or password')
      }
      const arePasswordsMatch = await comparePassword(value, user.password)
      if (!arePasswordsMatch) {
        throw createErrorClass(
          'IInvalid email or password',
          UNAUTHORIZED_ERROR_CODE
        )
      }
      req.user = user
    }),
]
