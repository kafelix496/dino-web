import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { AccessLevels, Apps } from '@/constants'
import { CollectionName } from '@/constants/collection'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { User } from '@/types'
import { isValidApp } from '@/utils'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | { message: string }>
) {
  try {
    const token = await getToken({ req })
    const currentUserId = token?.sub
    if (!currentUserId) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }

    const appAbbreviation = req.query.appAbbreviation
    if (!isValidApp(appAbbreviation)) {
      return res.status(400).json({ message: 'SEM_QUERY_NOT_ALLOWED' })
    }

    await dbConnect()

    const UserDoc = createDocument(CollectionName.USER, userSchema)

    const currentUser: User = await UserDoc.findOne({ _id: currentUserId })

    const currentUserAppAccessLevel =
      currentUser.accessLevel[appAbbreviation as Apps]

    // if the user access-level is not super admin or admin, return error
    if (
      currentUserAppAccessLevel !== AccessLevels.SUPER_ADMIN &&
      currentUserAppAccessLevel !== AccessLevels.ADMIN
    ) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }

    switch (req?.method) {
      case 'GET': {
        const users: User[] = await (() => {
          if (currentUserAppAccessLevel === AccessLevels.SUPER_ADMIN) {
            return UserDoc.find({
              [`accessLevel.${appAbbreviation as Apps}`]: {
                $ne: AccessLevels.SUPER_ADMIN
              }
            })
          }

          // if user-app-access-level is admin
          // because only super-admin and admin can go through here
          return UserDoc.find({
            $and: [
              {
                [`accessLevel.${appAbbreviation as Apps}`]: {
                  $ne: AccessLevels.SUPER_ADMIN
                }
              },
              {
                [`accessLevel.${appAbbreviation as Apps}`]: {
                  $ne: AccessLevels.ADMIN
                }
              }
            ]
          })
        })()

        if (!users) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json(users)
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
