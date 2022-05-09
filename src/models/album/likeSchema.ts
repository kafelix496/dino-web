import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
)

const likeSchema = new mongoose.Schema(
  {
    clicked: {
      type: Boolean,
      required: true
    },
    users: [UserSchema]
  },
  {
    versionKey: false
  }
)

likeSchema.set('timestamps', false)

export default likeSchema
