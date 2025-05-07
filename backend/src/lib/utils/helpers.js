import { ErrorResponse } from '../classes/errorResponseClass.js'

export const createErrorClass = (message, statusCode) => {
  return new ErrorResponse(message, statusCode)
}

export const createValidationErrorMessage = (errors) => {
  let errorMessage = ''
  const errorsArray = errors.array()
  errorsArray.forEach((error, index) => {
    if (error.type === 'field') {
      errorMessage += `${error.msg}${
        index === errorsArray.length - 1 ? '.' : ' | '
      }`
    }
  })
  return errorMessage
}

export const deleteKeyInObject = (obj, key) => {
  delete obj[key]
}

export const constructPayload = (sub, id, iat) => {
  return {
    sub,
    id,
    iat,
  }
}

export const createUserObj = (...args) => {
  const [email, fullName, password] = args
  return {
    email,
    fullName,
    password,
  }
}
