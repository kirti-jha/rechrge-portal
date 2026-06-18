import mongoose from 'mongoose'

export async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    return { connected: false, mode: 'memory' }
  }

  try {
    await mongoose.connect(mongoUri)
    return { connected: true, mode: 'mongo' }
  } catch (error) {
    const allowFallback = process.env.ALLOW_MEMORY_FALLBACK !== 'false'

    if (!allowFallback) {
      throw error
    }

    console.warn('Mongo connection failed, using memory store instead.')
    console.warn(error.message)
    return { connected: false, mode: 'memory' }
  }
}
