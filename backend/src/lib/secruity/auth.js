import bcrypt from 'bcryptjs'

export const hashPassword = async (plaintext, salt = 10) => {
  return await bcrypt.hash(plaintext, salt)
}

export const comparePassword = async (plaintext, hashedPassword) => {
    return await bcrypt.compare(plaintext, hashedPassword)
}