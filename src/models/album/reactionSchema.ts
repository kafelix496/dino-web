import mongoose from 'mongoose'

import { Reactions } from '@/constants/album'
import { CollectionsName } from '@/constants/collection'

const reactionSchema = new mongoose.Schema(
  {
    parent: {
      type: String,
      enum: [
        CollectionsName.ALBUM_ASSET,
        CollectionsName.ALBUM_POST,
        CollectionsName.ALBUM_COMMENT
      ],
      required: true
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'parent',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CollectionsName.USER,
      required: true
    },
    status: {
      type: String,
      enum: Reactions,
      required: true
    }
  },
  {
    versionKey: false
  }
)

reactionSchema.set('timestamps', false)

export default reactionSchema
