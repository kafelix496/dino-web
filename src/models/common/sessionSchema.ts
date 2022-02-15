import mongoose from 'mongoose'

import { CollectionName } from '@/global-constants/collection'

const sessionSchema = new mongoose.Schema({
  expires: {
    type: Date
  },
  sessionToken: {
    type: String,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CollectionName.USER
  }
})

sessionSchema.set('timestamps', true)

export default sessionSchema
