import mongoose from 'mongoose'

import { AccessLevels } from '@/constants/app'

const userSchema = new mongoose.Schema(
  {
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
    accessLevel: {
      fa: {
        type: String,
        enum: Object.values(AccessLevels),
        default: AccessLevels.NONE
      },
      mt: {
        type: String,
        enum: Object.values(AccessLevels),
        default: AccessLevels.NONE
      }
    }
  },
  {
    versionKey: false
  }
)

userSchema.set('timestamps', true)

export default userSchema
