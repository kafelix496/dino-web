import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { AccessLevels, Apps } from '@/constants'
import { CollectionName } from '@/constants/collection'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { User } from '@/types'
import { isValidApp } from '@/utils'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message?: string }>
) {
  try {
    const session = await getSession({ req })
    const user = session?.user
    if (!user) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }

    const { appAbbreviation: appAbbreviation, userId: targetUserId } = req.query
    if (!isValidApp(appAbbreviation)) {
      return res.status(400).json({ message: 'SEM_QUERY_NOT_ALLOWED' })
    }

    const userAppAccessLevel = user[`${appAbbreviation as Apps}AccessLevel`]

    // if the user access-level is not super admin or admin, return error
    if (
      userAppAccessLevel !== AccessLevels.SUPER_ADMIN &&
      userAppAccessLevel !== AccessLevels.ADMIN
    ) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }

    await dbConnect()

    const UserDoc = createDocument(CollectionName.USER, userSchema)

    switch (req?.method) {
      case 'PUT': {
        const newPermission = req?.body.permission

        // there is no way the user can set super admin
        if (newPermission === AccessLevels.SUPER_ADMIN) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        // if the user access-level is admin but try to change other user to admin
        // do not update database
        if (
          userAppAccessLevel === AccessLevels.ADMIN &&
          newPermission === AccessLevels.ADMIN
        ) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        const user: User = await UserDoc.findByIdAndUpdate(
          targetUserId,
          { [`${appAbbreviation}AccessLevel`]: newPermission },
          {
            new: true,
            runValidators: true
          }
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
