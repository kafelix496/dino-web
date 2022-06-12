import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 25
    }
  },
  {
    versionKey: false
  }
)

categorySchema.set('timestamps', false)

export default categorySchema
