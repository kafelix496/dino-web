import mongoose from 'mongoose'

import { CollectionsName } from '@/constants/collection'

const sessionSchema = new mongoose.Schema(
  {
    expires: {
      type: Date
    },
    sessionToken: {
      type: String,
      unique: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CollectionsName.USER
    }
  },
  {
    versionKey: false
  }
)

sessionSchema.set('timestamps', true)

export default sessionSchema
