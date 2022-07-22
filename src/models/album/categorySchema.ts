import mongoose from 'mongoose'

import { CollectionsName } from '@/constants/collection'
import postSchema from '@/models/album/postSchema'
import { createDocument } from '@/models/utils/createDocument'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 25,
      unique: true
    }
  },
  {
    versionKey: false
  }
)

categorySchema.set('timestamps', false)
categorySchema.post('findOneAndDelete', async function (doc, next) {
  await createDocument(CollectionsName.ALBUM_POST, postSchema).update(
    {
      categories: doc._id
    },
    {
      $pull: {
        categories: doc._id
      }
    }
  )

  next()
})

export default categorySchema
