import mongoose from 'mongoose'
import config from '../../core/config.js'

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URL)
    console.log(`Connected to ${conn.connection.host}`)
  } catch (e) {
    console.log(`MongoDB connection error: ${e}`)
  }
}
