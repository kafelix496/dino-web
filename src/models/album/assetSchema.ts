import mongoose from 'mongoose'

const assetSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
)

assetSchema.set('timestamps', false)

export default assetSchema
