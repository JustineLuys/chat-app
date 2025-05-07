import User from '../../../models/User.js'

export const createUserModel = (userData) => {
  return new User({
    ...userData,
  })
}

export const saveUserToDb = async (newUser) => {
  return await newUser.save()
}

export const getUserById = async (userId) => {
  return await User.findById(userId).select('-password')
}
export const getUserByEmail = async (email) => {
  return await User.findOne({
    email,
  })
}

export const getAllUsersExceptLoggedInUser = async (loggedInUserId) => {
  return await User.find({
    _id: {
      $ne: loggedInUserId,
    },
  })
}
