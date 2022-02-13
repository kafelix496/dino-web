import mongoose from 'mongoose'

import { AccessLevels } from '@/global-types'
import { CollectionName } from '@/global-types/collection'

const accessUserSchema = new mongoose.Schema({
  accessUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CollectionName.USER,
    required: true
  },
  accessLevel: {
    type: String,
    enum: Object.values(AccessLevels),
    required: true
  }
})

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50
  },
  description: {
    type: String,
    maxLength: 200
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CollectionName.USER,
    required: true
  },
  accessUsers: {
    type: [accessUserSchema]
  }
})

projectSchema.set('timestamps', true)

export default projectSchema
