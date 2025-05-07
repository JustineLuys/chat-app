// Custom Error Class for response
export class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}
