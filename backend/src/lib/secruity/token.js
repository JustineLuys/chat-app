import jwt from 'jsonwebtoken'
import config from '../../core/config.js'

export const generateToken = (payload, res) => {
  const token = jwt.sign(payload, config.SECRET_KEY, {
    expiresIn: config.EXPIRES_IN,
  })
  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: config.NODE_ENV !== 'development',
  })

  return token
}
