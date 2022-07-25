import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { AccessLevels, Apps } from '@/constants/app'
import { CollectionsName } from '@/constants/collection'
import commentSchema from '@/models/album/commentSchema'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { User } from '@/types'
import type { Comment, CommentResponse, ReactionResponse } from '@/types/album'
import {
  generateLookupForReactions,
  transformReactionsForClient
} from '@/utils/album'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | CommentResponse
    | { total: number; comments: Comment[] }
    | { message?: string }
  >
) {
  try {
    const token = await getToken({ req })
    const currentUserId = token!.sub!
    const appAbbreviation = req.query.appAbbreviation as Apps
    if (appAbbreviation !== Apps.familyAlbum) {
      return res.status(400).json({ message: 'SEM_QUERY_NOT_ALLOWED' })
    }

    await dbConnect()

    const userDoc = createDocument(CollectionsName.USER, userSchema)
    const currentUser: User | null = await userDoc.findOne({
      _id: currentUserId
    })
    if (!currentUser) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }
    const currentUserAppAccessLevel = currentUser.accessLevel[appAbbreviation]
    // if the user access-level is not super admin or admin, return error
    if (
      currentUserAppAccessLevel !== AccessLevels.SUPER_ADMIN &&
      currentUserAppAccessLevel !== AccessLevels.ADMIN
    ) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }

    switch (req.method) {
      case 'GET': {
        const { parent, parentId, page } = req.query

        const commentDoc = createDocument(
          CollectionsName.ALBUM_COMMENT,
          commentSchema
        )

        const [result]: { total: number; comments: Comment[] }[] =
          await commentDoc.aggregate([
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$parent', parent]
                    },
                    {
                      $eq: [
                        '$parentId',
                        new mongoose.Types.ObjectId(parentId as string)
                      ]
                    }
                  ]
                }
              }
            },
            {
              $facet: {
                total: [{ $count: 'count' }],
                comments: [
                  {
                    $skip: (parseInt(page as string) - 1) * 25
                  },
                  {
                    $limit: 25
                  },
                  generateLookupForReactions(CollectionsName.ALBUM_COMMENT)
                ]
              }
            },
            {
              $project: {
                total: { $arrayElemAt: ['$total.count', 0] },
                comments: 1
              }
            }
          ])

        if (!result) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json({
          ...result,
          comments: result.comments.map((comment) => ({
            ...comment,
            reaction: transformReactionsForClient(
              currentUserId,
              comment.reaction as unknown as ReactionResponse[]
            )
          }))
        })
      }

      case 'POST': {
        const { parent, parentId, content } = req.body ?? {}

        const commentDoc = createDocument(
          CollectionsName.ALBUM_COMMENT,
          commentSchema
        )

        const comment: CommentResponse = await commentDoc.create({
          parent,
          parentId,
          content
        })

        if (!comment) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(201).json(comment)
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
