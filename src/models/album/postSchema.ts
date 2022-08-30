import mongoose from 'mongoose'

import { PostAudiences } from '@/constants/album'
import { CollectionsName } from '@/constants/collection'
import assetSchema from '@/models/album/assetSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { AssetDefault } from '@/types/album'

const minAssetLength = (value: AssetDefault[]) => value.length > 0

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 25
    },
    description: {
      type: String,
      maxLength: 500
    },
    audience: {
      type: String,
      required: true,
      enum: PostAudiences
    },
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
    }
  },
  {
    versionKey: false
  }
)

postSchema.set('timestamps', true)
postSchema.post('findOneAndDelete', async function (doc, next) {
  await createDocument(CollectionsName.ALBUM_ASSET, assetSchema).deleteMany({
    _id: { $in: doc.assets }
  })

  next()
})

export default postSchema
