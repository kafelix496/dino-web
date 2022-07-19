import mongoose from 'mongoose'

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
    extension: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
)

assetSchema.set('timestamps', true)
assetSchema.post('remove', async function (next) {
  await createDocument(CollectionsName.ALBUM_COMMENT, commentSchema).deleteMany(
    {
      parent: CollectionsName.ALBUM_ASSET,
      parentId: this._id
    }
  )

  await createDocument(
    CollectionsName.ALBUM_REACTION,
    reactionSchema
  ).deleteMany({
    parent: CollectionsName.ALBUM_ASSET,
    parentId: this._id
  })

  next()
})

export default assetSchema
