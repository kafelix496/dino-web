import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { AccessLevels, Apps } from '@/constants/app'
import { CollectionsName } from '@/constants/collection'
import reactionSchema from '@/models/album/reactionSchema'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { User } from '@/types'
import type { ReactionResponse } from '@/types/album'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReactionResponse | { message?: string }>
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
      case 'POST': {
        const { parent, parentId, status } = req.body ?? {}

        const reactionDoc = createDocument(
          CollectionsName.ALBUM_REACTION,
          reactionSchema
        )

        await reactionDoc.deleteMany({
          parent,
          parentId,
          user: currentUserId
        })

        const reaction: ReactionResponse = await reactionDoc.create({
          parent,
          parentId,
          user: currentUserId,
          status
        })
        if (!reaction) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(201).json(reaction)
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
