import { getAllUsersExceptLoggedInUser } from '../../lib/db/services/userDbService.js'
import { asyncHandler } from '../../lib/handlers/asyncHandler.js'

export const displayAllUsers = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user._id
  const filteredUsers = await getAllUsersExceptLoggedInUser(loggedInUserId)
  res.status(200).json({
    success: true,
    data: filteredUsers,
  })
})
