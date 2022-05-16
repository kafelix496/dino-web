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
    versionKey: false,
    _id: false
  }
)

const likeSchema = new mongoose.Schema(
  {
    clicked: {
      type: Boolean,
      required: true,
      default: false
    },
    users: [UserSchema]
  },
  {
    versionKey: false,
    _id: false
  }
)

likeSchema.set('timestamps', false)

export default likeSchema
