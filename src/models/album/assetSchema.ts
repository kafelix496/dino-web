import mongoose from 'mongoose'

import { FileExtensions, FileTypes } from '@/constants/app'

const assetSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: Object.values(FileTypes),
      required: true
    },
    extension: {
      type: String,
      enum: Object.values(FileExtensions),
      required: true
    }
  },
  {
    versionKey: false
  }
)

assetSchema.set('timestamps', true)

export default assetSchema
