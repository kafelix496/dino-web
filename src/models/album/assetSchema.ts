import mongoose from 'mongoose'

import { FileExtensions, FileTypes } from '@/constants/app'
import { CollectionsName } from '@/constants/collection'
import commentSchema from '@/models/album/commentSchema'
import reactionSchema from '@/models/album/reactionSchema'
import { createDocument } from '@/models/utils/createDocument'

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
assetSchema.post('findOneAndDelete', async function (doc, next) {
  await createDocument(CollectionsName.ALBUM_COMMENT, commentSchema).deleteMany(
    {
      parent: CollectionsName.ALBUM_ASSET,
      parentId: doc._id
    }
  )

  await createDocument(
    CollectionsName.ALBUM_REACTION,
    reactionSchema
  ).deleteMany({
    parent: CollectionsName.ALBUM_ASSET,
    parentId: doc._id
  })

  next()
})

export default assetSchema
