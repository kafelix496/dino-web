import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { AccessLevels, Apps } from '@/constants'
import { CollectionsName } from '@/constants/collection'
import postSchema from '@/models/album/postSchema'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { User } from '@/types'
import type { Post } from '@/types/album'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    Post | { total: number; posts: Post[] } | { message?: string }
  >
) {
  try {
    const token = await getToken({ req })
    const currentUserId = token!.sub!
    const { appAbbreviation, page } = req.query as {
      appAbbreviation: Apps
      page: unknown
    }

    await dbConnect()

    const userDoc = createDocument(CollectionsName.USER, userSchema)
    const currentUser: User = await userDoc.findOne({ _id: currentUserId })
    const currentUserAppAccessLevel = currentUser.accessLevel[appAbbreviation]
    // if the user access-level is not super admin or admin, return error
    if (
      currentUserAppAccessLevel !== AccessLevels.SUPER_ADMIN &&
      currentUserAppAccessLevel !== AccessLevels.ADMIN
    ) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }

    const postDoc = createDocument(CollectionsName.ALBUM_POST, postSchema)

    switch (req.method) {
      case 'GET': {
        if (Array.isArray(page) || !/^[1-9](\d+)?$/.test(page as string)) {
          return res.status(401).json({ message: 'SEM_QUERY_NOT_ALLOWED' })
        }

        // TODO
        // I want to get the result with a single request
        // but I don't know how to use aggregate.
        const total = await postDoc.countDocuments({})
        const posts: Post[] = await postDoc
          .find(
            {},
            {
              comments: { $slice: 25 },
              'like.users': { $slice: 3 },
              'assets.comments': 0,
              'assets.like': 0,
              'assets.createdAt': 0,
              'assets.updatedAt': 0
            }
          )
          .skip((parseInt(page as string) - 1) * 25)
          .limit(25)

        if (!total || !posts) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json({ total, posts })
      }

      case 'POST': {
        const { assets, categories } = req.body ?? {}

        const post: Post = await postDoc.create({
          assets,
          categories: categories ?? []
        })

        if (!post) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(201).json(post)
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
