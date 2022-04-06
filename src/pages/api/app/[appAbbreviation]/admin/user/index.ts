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
  res: NextApiResponse<User[] | { message: string }>
) {
  try {
    const session = await getSession({ req })
    const user = session?.user
    if (!user) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }

    const targetAppAbbreviation = req.query.appAbbreviation
    if (!isValidApp(targetAppAbbreviation)) {
      return res.status(400).json({ message: 'SEM_QUERY_NOT_ALLOWED' })
    }

    const userAppAccessLevel =
      user[`${targetAppAbbreviation as Apps}AccessLevel`]

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
      case 'GET': {
        const users: User[] = await (() => {
          if (userAppAccessLevel === AccessLevels.SUPER_ADMIN) {
            return UserDoc.find({
              [`${targetAppAbbreviation as Apps}AccessLevel`]: {
                $ne: AccessLevels.SUPER_ADMIN
              }
            })
          }

          // if user-app-access-level is admin
          // because only super-admin and admin can go through here
          return UserDoc.find({
            $and: [
              {
                [`${targetAppAbbreviation as Apps}AccessLevel`]: {
                  $ne: AccessLevels.SUPER_ADMIN
                }
              },
              {
                [`${targetAppAbbreviation as Apps}AccessLevel`]: {
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
