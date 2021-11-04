import mongoose from 'mongoose'

const connection: { db: typeof mongoose | null; isConnected: number } = {
  db: null,
  isConnected: 0
}

export async function dbConnect() {
  if (connection.isConnected) {
    return connection.db
  }

  const db = await mongoose.connect(process.env.DATABASE_URL)

  connection.db = db
  connection.isConnected = db.connections[0].readyState

  return db
}
