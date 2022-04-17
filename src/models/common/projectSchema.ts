import mongoose from 'mongoose'

import { AccessLevels } from '@/constants'
import { CollectionName } from '@/constants/collection'

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
    maxLength: 25
  },
  description: {
    type: String,
    required() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const description: string = (this as any).description

      return typeof description !== 'string'
    },
    maxLength: 100
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
