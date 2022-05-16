import mongoose from 'mongoose'

import assetSchema from '@/models/album/assetSchema'
import categorySchema from '@/models/album/categorySchema'
import commentSchema from '@/models/album/commentSchema'
import likeSchema from '@/models/album/likeSchema'

const postSchema = new mongoose.Schema(
  {
    categories: [categorySchema],
    like: {
      type: likeSchema,
      required: true,
      default: { clicked: false, users: [] }
    },
    assets: [assetSchema],
    comments: [commentSchema]
  },
  {
    versionKey: false
  }
)

postSchema.set('timestamps', true)

export default postSchema
