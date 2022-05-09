import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: 500
    }
  },
  {
    versionKey: false
  }
)

commentSchema.set('timestamps', true)

export default commentSchema
