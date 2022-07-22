import mongoose from 'mongoose'

import { CollectionsName } from '@/constants/collection'
import reactionSchema from '@/models/album/reactionSchema'
import { createDocument } from '@/models/utils/createDocument'

const commentSchema = new mongoose.Schema(
  {
    parent: {
      type: String,
      enum: [CollectionsName.ALBUM_ASSET, CollectionsName.ALBUM_POST],
      required: true
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'parent',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxLength: 500
    }
  },
  {
    versionKey: false
  }
)

commentSchema.set('timestamps', true)
commentSchema.post('findOneAndDelete', async function (doc, next) {
  await createDocument(
    CollectionsName.ALBUM_REACTION,
    reactionSchema
  ).deleteMany({
    parent: CollectionsName.ALBUM_COMMENT,
    parentId: doc._id
  })

  next()
})

export default commentSchema
