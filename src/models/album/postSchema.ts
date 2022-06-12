import mongoose from 'mongoose'

import { PostAudiences } from '@/constants/album'
import { CollectionsName } from '@/constants/collection'
import assetSchema from '@/models/album/assetSchema'
import commentSchema from '@/models/album/commentSchema'
import reactionSchema from '@/models/album/reactionSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { AssetDefault } from '@/types/album'

const minAssetLength = (value: AssetDefault[]) => value.length > 0

const postSchema = new mongoose.Schema(
  {
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: CollectionsName.ALBUM_CATEGORY,
      required: true
    },
    assets: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: CollectionsName.ALBUM_ASSET,
      required: true,
      validate: minAssetLength
    },
    audience: {
      type: String,
      required: true,
      enum: PostAudiences
    }
  },
  {
    versionKey: false
  }
)

postSchema.set('timestamps', true)
postSchema.post('remove', async function (next) {
  await createDocument(CollectionsName.ALBUM_ASSET, assetSchema).deleteMany({
    _id: { $in: this.assets }
  })

  await createDocument(CollectionsName.ALBUM_COMMENT, commentSchema).deleteMany(
    {
      parent: CollectionsName.ALBUM_POST,
      parentId: this._id
    }
  )

  await createDocument(
    CollectionsName.ALBUM_REACTION,
    reactionSchema
  ).deleteMany({
    parent: CollectionsName.ALBUM_POST,
    parentId: this._id
  })

  next()
})

export default postSchema
