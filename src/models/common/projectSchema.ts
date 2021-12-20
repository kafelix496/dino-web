import mongoose from 'mongoose'

import { AccessLevelType } from '@/global-types/index'

const accessUserSchema = new mongoose.Schema({
  accessUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  accessLevel: {
    type: String,
    enum: Object.values(AccessLevelType),
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
    ref: 'user',
    required: true
  },
  accessUsers: {
    type: [accessUserSchema]
  }
})

projectSchema.set('timestamps', true)

export default projectSchema
