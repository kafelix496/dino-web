import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import type { Account } from 'next-auth'
import type { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters'

import { CollectionsName } from '@/constants/collection'
import albumAssetSchema from '@/models/album/assetSchema'
import albumCategorySchema from '@/models/album/categorySchema'
import albumCommentSchema from '@/models/album/commentSchema'
import albumPostSchema from '@/models/album/postSchema'
import albumReactionSchema from '@/models/album/reactionSchema'
import accountSchema from '@/models/common/accountSchema'
import projectSchema from '@/models/common/projectSchema'
import sessionSchema from '@/models/common/sessionSchema'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'

createDocument(CollectionsName.USER, userSchema)
createDocument(CollectionsName.PROJECT, projectSchema)
createDocument(CollectionsName.ACCOUNT, accountSchema)
createDocument(CollectionsName.SESSION, sessionSchema)
createDocument(CollectionsName.ALBUM_POST, albumPostSchema)
createDocument(CollectionsName.ALBUM_ASSET, albumAssetSchema)
createDocument(CollectionsName.ALBUM_CATEGORY, albumCategorySchema)
createDocument(CollectionsName.ALBUM_REACTION, albumReactionSchema)
createDocument(CollectionsName.ALBUM_COMMENT, albumCommentSchema)

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection.db
  }

  return mongoose.connect(process.env.DATABASE_URL)
}

export const format = {
  /** Takes a mongoDB object and returns a plain old JavaScript object */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  from<T = Record<string, unknown>>(object: Record<string, any>): T {
    const newObject: Record<string, unknown> = {}
    for (const key in object) {
      const value = object[key]
      if (key === '_id') {
        newObject.id = value.toHexString()
      } else if (key === 'userId') {
        newObject[key] = value.toHexString()
      } else if (key !== '__v') {
        newObject[key] = value
      }
    }
    return newObject as T
  }
}

/** Converts from string to ObjectId */
export function _id(hex?: string) {
  if (hex?.length !== 24) return new ObjectId()
  return new ObjectId(hex)
}

export function MongooseAdapter(): Adapter {
  const { from } = format

  ;(async () => {
    await dbConnect()
  })()

  const UserModel = createDocument(CollectionsName.USER, userSchema)
  const AccountModel = createDocument(CollectionsName.ACCOUNT, accountSchema)
  const SessionModel = createDocument(CollectionsName.SESSION, sessionSchema)

  return {
    async createUser(data) {
      const user = await UserModel.create(data)
      return from<AdapterUser>(user)
    },
    async getUser(id) {
      try {
        const user = await UserModel.findById(id).lean()
        if (!user) return null
        return from<AdapterUser>(user)
      } catch (err) {
        return null
      }
    },
    async getUserByEmail(email) {
      const user = await UserModel.findOne({ email: email }).lean()
      if (!user) return null
      return from<AdapterUser>(user)
    },
    async getUserByAccount(data) {
      const account = await AccountModel.findOne(data)
      if (!account) return null
      const user = await UserModel.findById(account.userId).lean()
      if (!user) return null
      return from<AdapterUser>(user)
    },
    async updateUser(data) {
      const user = await UserModel.findByIdAndUpdate(
        data.id,
        { name: data.name },
        { new: true }
      ).exec()
      return from<AdapterUser>(user)
    },
    async deleteUser(id) {
      await Promise.all([
        AccountModel.deleteMany({ userId: id }),
        SessionModel.deleteMany({ userId: id }),
        UserModel.findByIdAndDelete(id)
      ])
    },
    async linkAccount(data) {
      const account = await AccountModel.create(data)
      return from<Account>(account)
    },
    async unlinkAccount(data) {
      const account = await AccountModel.findOneAndDelete(data)
      return from<Account>(account)
    },
    async getSessionAndUser() {
      return null
    },
    async createSession() {
      return from<AdapterSession>({})
    },
    async updateSession() {
      return from<AdapterSession>({})
    },
    async deleteSession() {
      return from<AdapterSession>({})
    }
  }
}
