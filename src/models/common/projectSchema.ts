import mongoose from 'mongoose'

import { AccessLevels } from '@/constants'
import { CollectionsName } from '@/constants/collection'

const accessUserSchema = new mongoose.Schema(
  {
    accessUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CollectionsName.USER,
      required: true
    },
    accessLevel: {
      type: String,
      enum: Object.values(AccessLevels),
      required: true
    }
  },
  {
    versionKey: false
  }
)

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 25
    },
    description: {
      type: String,
      // description could be empty string
      required() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const description: string = (this as any).description

        return typeof description !== 'string' && description !== undefined
      },
      maxLength: 100
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CollectionsName.USER,
      required: true
    },
    accessUsers: {
      type: [accessUserSchema]
    }
  },
  {
    versionKey: false
  }
)

projectSchema.set('timestamps', true)

export default projectSchema
