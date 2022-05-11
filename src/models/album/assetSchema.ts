import mongoose from 'mongoose'

import commentSchema from '@/models/album/commentSchema'
import likeSchema from '@/models/album/likeSchema'

const assetSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true
    },
    like: likeSchema,
    comments: [commentSchema]
  },
  {
    versionKey: false
  }
)

assetSchema.set('timestamps', false)

export default assetSchema
