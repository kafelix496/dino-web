import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  emailVerified: {
    type: Date
  },
  image: {
    type: String
  }
})

userSchema.set('timestamps', true)

export default userSchema
