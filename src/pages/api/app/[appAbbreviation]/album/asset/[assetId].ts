import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { AccessLevels, Apps } from '@/constants/app'
import { CollectionsName } from '@/constants/collection'
import assetSchema from '@/models/album/assetSchema'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { User } from '@/types'
import type { Asset, ReactionResponse } from '@/types/album'
import {
  generateLookupForComments,
  generateLookupForReactions,
  transformReactionsForClient
} from '@/utils/album'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Asset | { message?: string }>
) {
  try {
    const token = await getToken({ req })
    const currentUserId = token!.sub!
    const { appAbbreviation, assetId } = req.query as {
      appAbbreviation: Apps
      assetId: unknown
    }
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
        const assetDoc = createDocument(
          CollectionsName.ALBUM_ASSET,
          assetSchema
        )

        const [asset]: (Omit<Asset, 'siblings'> & {
          siblings: { assets: string }[]
        })[] = await assetDoc.aggregate([
          {
            $match: { _id: new mongoose.Types.ObjectId(assetId as string) }
          },
          generateLookupForComments(1, CollectionsName.ALBUM_ASSET),
          generateLookupForReactions(CollectionsName.ALBUM_ASSET),
          {
            $lookup: {
              from: CollectionsName.ALBUM_POST,
              pipeline: [
                {
                  $match: {
                    assets: {
                      $in: [new mongoose.Types.ObjectId(assetId as string)]
                    }
                  }
                },
                {
                  $project: { _id: 0, assets: 1 }
                },
                {
                  $unwind: '$assets'
                }
              ],
              as: 'siblings'
            }
          }
        ])

        if (!asset) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json({
          ...asset,
          siblings: asset.siblings.map((sibling) => sibling.assets),
          reaction: transformReactionsForClient(
            currentUserId,
            asset.reaction as unknown as ReactionResponse[]
          )
        })
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
