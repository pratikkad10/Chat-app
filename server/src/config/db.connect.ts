import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGOURI;
    if (!mongoUri) {
      throw new Error('MONGOURI environment variable is not defined');
    }
    const conn = await mongoose.connect(mongoUri, {
    })
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDB
