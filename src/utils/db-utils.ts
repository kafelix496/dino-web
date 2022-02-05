import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import type { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters'
import type { Account } from 'next-auth'

import { createDocument } from '@/models/utils/createDocument'
import userSchema from '@/models/common/userSchema'
import accountSchema from '@/models/common/accountSchema'
import sessionSchema from '@/models/common/sessionSchema'
import { CollectionName } from '@/global-types/collection'

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection.db
  }

  return mongoose.connect(process.env.DATABASE_URL)
}

export const format = {
  /** Takes a mongoDB object and returns a plain old JavaScript object */
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

  const UserModel = createDocument(CollectionName.USER, userSchema)
  const AccountModel = createDocument(CollectionName.ACCOUNT, accountSchema)
  const SessionModel = createDocument(CollectionName.SESSION, sessionSchema)

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
