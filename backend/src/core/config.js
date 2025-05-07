import dotenv from 'dotenv'

dotenv.config()
class Config {
  constructor() {
    this.PORT = process.env.PORT || 5000
    this.MONGODB_URL = process.env.MONGODB_URL
    this.MONGODB_USERNAME = process.env.MONGODB_USERNAME
    this.MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
    this.SECRET_KEY = process.env.SECRET_KEY
    this.EXPIRES_IN = process.env.EXPIRES_IN
    this.NODE_ENV = process.env.NODE_ENV
    this.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
    this.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
    this.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
  }
}

const config = new Config()

export default config
