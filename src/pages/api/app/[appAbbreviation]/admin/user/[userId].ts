import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { AccessLevels, Apps } from '@/constants'
import { CollectionsName } from '@/constants/collection'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { User } from '@/types'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message?: string }>
) {
  try {
    const token = await getToken({ req })
    const currentUserId = token!.sub!
    const { appAbbreviation, userId: targetUserId } = req.query as {
      appAbbreviation: Apps
      userId: unknown
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

    switch (req.method) {
      case 'PUT': {
        const newPermission = req.body?.permission

        // there is no way the user can set super admin
        if (newPermission === AccessLevels.SUPER_ADMIN) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        // if the user access-level is admin but try to change other user to admin
        // do not update database
        if (
          currentUserAppAccessLevel === AccessLevels.ADMIN &&
          newPermission === AccessLevels.ADMIN
        ) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        const user: User = await userDoc.findByIdAndUpdate(
          targetUserId,
          { [`accessLevel.${appAbbreviation}`]: newPermission },
          { new: true, runValidators: true }
        )

        if (!user) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json(user)
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
