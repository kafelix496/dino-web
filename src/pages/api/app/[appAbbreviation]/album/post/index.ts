import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { AccessLevels, Apps } from '@/constants'
import { PostAudiences } from '@/constants/album'
import { CollectionsName } from '@/constants/collection'
import assetSchema from '@/models/album/assetSchema'
import postSchema from '@/models/album/postSchema'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { User } from '@/types'
import type { Post, ReactionResponse } from '@/types/album'
import {
  generateLookupForComments,
  generateLookupForReactions,
  getDefaultReaction,
  transformReactionsForClient
} from '@/utils/album'
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
    const appAbbreviation = req.query.appAbbreviation as Apps

    await dbConnect()

    const userDoc = createDocument(CollectionsName.USER, userSchema)
    const currentUser: User = await userDoc.findOne({ _id: currentUserId })
    const currentUserAppAccessLevel = currentUser.accessLevel[appAbbreviation]
    // if the user access-level is none, return error
    if (currentUserAppAccessLevel === AccessLevels.NONE) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }

    const postDoc = createDocument(CollectionsName.ALBUM_POST, postSchema)

    switch (req.method) {
      case 'GET': {
        const { page, category } = req.query
        const audience =
          currentUserAppAccessLevel === AccessLevels.VIEWER
            ? PostAudiences.VIEWER
            : PostAudiences.ALL

        const match = category
          ? {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$audience', audience]
                    }
                  ]
                }
              }
            }
          : {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$audience', audience]
                    },
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

        const [result]: { total: number; posts: Post[] }[] =
          await postDoc.aggregate([
            match,
            {
              $facet: {
                total: [{ $count: 'count' }],
                posts: [
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
                  },
                  generateLookupForComments(1, CollectionsName.ALBUM_POST),
                  generateLookupForReactions(CollectionsName.ALBUM_POST)
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
          posts: result.posts.map((post) => ({
            ...post,
            reaction: transformReactionsForClient(
              currentUserId,
              post.reaction as unknown as ReactionResponse[]
            ),
            comments: post.comments.map((comment) => ({
              ...comment,
              reaction: transformReactionsForClient(
                currentUserId,
                comment.reaction as unknown as ReactionResponse[]
              )
            }))
          }))
        })
      }

      case 'POST': {
        const { assetsKey, categoriesId, audience, description } =
          req.body ?? {}

        const assetDoc = createDocument(
          CollectionsName.ALBUM_ASSET,
          assetSchema
        )

        const assets = await assetDoc.create(
          (assetsKey as string[]).map((key) => ({ key }))
        )
        if (!assets) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        const post = await postDoc.create({
          assets: assets.map((asset) => asset._id),
          categories: categoriesId ?? [],
          audience,
          description
        })
        if (!post) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        const newPost = await postDoc
          .findOne({ _id: post._id })
          .populate('assets')
          .populate('categories')
        if (!newPost) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(201).json({
          ...newPost._doc,
          reaction: {
            _id: null,
            status: null,
            items: getDefaultReaction()
          },
          comments: []
        })
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
