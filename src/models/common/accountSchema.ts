import mongoose from 'mongoose'

import { CollectionName } from '@/global-constants/collection'

const accountSchema = new mongoose.Schema({
  type: {
    type: String
  },
  provider: {
    type: String
  },
  providerAccountId: {
    type: String
  },
  access_token: {
    type: String
  },
  expires_at: {
    type: Number
  },
  token_type: {
    type: String
  },
  scope: {
    type: String
  },
  id_token: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CollectionName.USER
  }
})

accountSchema.set('timestamps', true)

export default accountSchema
