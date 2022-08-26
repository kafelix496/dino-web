import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { PostAudiences } from '@/constants/album'
import { AccessLevels, Apps } from '@/constants/app'
import { CollectionsName } from '@/constants/collection'
import assetSchema from '@/models/album/assetSchema'
import postSchema from '@/models/album/postSchema'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { User } from '@/types'
import type { AssetDefault, Post, PostRaw } from '@/types/album'
import { dbConnect } from '@/utils/database'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | { post: PostRaw; assets: AssetDefault[] }
    | { total: number; posts: Post[] }
    | { message?: string }
  >
) {
  try {
    const token = await getToken({ req })
    const currentUserId = token!.sub!
    const appAbbreviation = req.query.appAbbreviation as Apps

    await dbConnect()

    const userDoc = createDocument(CollectionsName.USER, userSchema)
    const currentUser: User | null = await userDoc.findOne({
      _id: currentUserId
    })
    if (!currentUser) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }
    const currentUserAppAccessLevel = currentUser.accessLevel[appAbbreviation]

    const postDoc = createDocument(CollectionsName.ALBUM_POST, postSchema)

    switch (req.method) {
      case 'GET': {
        const { page, category } = req.query
        const audienceMatch =
          currentUserAppAccessLevel === AccessLevels.NONE
            ? {
                $eq: ['$audience', PostAudiences.ALL]
              }
            : {}

        const match = category
          ? {
              $match: {
                $expr: {
                  $and: [
                    audienceMatch,
                    {
                      $in: [
                        new mongoose.Types.ObjectId(category as string),
                        '$categories'
                      ]
                    }
                  ]
                }
              }
            }
          : {
              $match: {
                $expr: {
                  $and: [audienceMatch]
                }
              }
            }

        const [result]: { total: number; posts: Post[] }[] =
          await postDoc.aggregate([
            match,
            {
              $facet: {
                total: [{ $count: 'count' }],
                posts: [
                  {
                    $sort: { createdAt: -1 }
                  },
                  {
                    $skip: (parseInt(page as string) - 1) * 25
                  },
                  {
                    $limit: 25
                  },
                  {
                    $lookup: {
                      from: CollectionsName.ALBUM_CATEGORY,
                      localField: 'categories',
                      foreignField: '_id',
                      as: 'categories'
                    }
                  },
                  {
                    $lookup: {
                      from: CollectionsName.ALBUM_ASSET,
                      localField: 'assets',
                      foreignField: '_id',
                      as: 'assets'
                    }
                  }
                ]
              }
            },
            {
              $project: {
                total: { $arrayElemAt: ['$total.count', 0] },
                posts: 1
              }
            }
          ])

        if (!result) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json({
          ...result,
          total: result?.total ?? 0,
          posts: result.posts
        })
      }

      case 'POST': {
        const {
          assets: assetsInput,
          audience,
          categories,
          title,
          description
        } = req.body ?? {}

        const assetDoc = createDocument(
          CollectionsName.ALBUM_ASSET,
          assetSchema
        )

        const assets: AssetDefault[] = await assetDoc.create(assetsInput)
        if (!assets) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        const post: PostRaw = await postDoc.create({
          assets: assets.map((asset) => asset._id),
          audience,
          categories: categories ?? [],
          title,
          description
        })
        if (!post) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(201).json({ post, assets })
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
