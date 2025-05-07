import { ErrorResponse } from '../lib/classes/errorResponseClass.js'
import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
} from '../lib/constants/statusCodes.js'

// Main App Error handler
export const appErrorHandler = (err, req, res, next) => {
  // Initially, err is set to unknown and we need to validate it first
  if (
    typeof err === 'object' &&
    err !== null &&
    'name' in err &&
    err.name === 'CastError'
  ) {
    // If it's CastError from Mongo DB, most likely the client provided the wrong ID Format
    const castErr = err
    // Return Resource not found to be more broad
    res.status(NOT_FOUND_ERROR_CODE).json({
      success: false,
      message: `Resource not found with id ${castErr.value}`,
    })
  }

  // Server Error Response

  if (err instanceof ErrorResponse) {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR_CODE).json({
      success: false,
      message: err.message || 'Internal server error occurred',
    })
  }
}
