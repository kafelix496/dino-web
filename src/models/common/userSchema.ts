import mongoose from 'mongoose'

import { AccessLevels } from '@/constants'

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  emailVerified: {
    type: Boolean
  },
  image: {
    type: String
  },
  // NOTE: 496-1
  faAccessLevel: {
    type: String,
    enum: Object.values(AccessLevels),
    default: AccessLevels.NONE
  },
  mtAccessLevel: {
    type: String,
    enum: Object.values(AccessLevels),
    default: AccessLevels.NONE
  }
})

userSchema.set('timestamps', true)

export default userSchema
