import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { AccessLevels, Apps } from '@/constants'
import { CollectionName } from '@/constants/collection'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
import { isValidApp } from '@/utils'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req })
    const user = session?.user
    if (!user) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }

    const targetApp = req.query.targetApp
    if (!isValidApp(targetApp)) {
      return res.status(400).json({ message: 'SEM_QUERY_NOT_ALLOWED' })
    }

    const userAppAccessLevel = user[`${targetApp as Apps}AccessLevel`]

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
        const users = await (() => {
          if (userAppAccessLevel === AccessLevels.SUPER_ADMIN) {
            return UserDoc.find({
              [`${targetApp as Apps}AccessLevel`]: {
                $ne: AccessLevels.SUPER_ADMIN
              }
            })
          }

          // if user-app-access-level is admin
          // because only super-admin and admin can go through here
          return UserDoc.find({
            $and: [
              {
                [`${targetApp as Apps}AccessLevel`]: {
                  $ne: AccessLevels.SUPER_ADMIN
                }
              },
              {
                [`${targetApp as Apps}AccessLevel`]: {
                  $ne: AccessLevels.ADMIN
                }
              }
            ]
          })
        })()

        if (!users) {
          return res.status(400).json({ message: 'SEM_FAIL_TO_FIND_USERS' })
        }

        return res.status(200).json(users)
      }

      case 'PUT': {
        const newPermission = req?.body.permission

        // there is no way the user can set super admin
        if (newPermission === AccessLevels.SUPER_ADMIN) {
          return res.status(400).json({ message: 'SEM_FAIL_TO_UPDATE_USER' })
        }

        // if the user access-level is admin but try to change other user to admin
        // do not update database
        if (
          userAppAccessLevel === AccessLevels.ADMIN &&
          newPermission === AccessLevels.ADMIN
        ) {
          return res.status(400).json({ message: 'SEM_FAIL_TO_UPDATE_USER' })
        }

        const newUser = await UserDoc.findByIdAndUpdate(
          user.id,
          { [`${targetApp}AccessLevel`]: newPermission },
          {
            new: true,
            runValidators: true
          }
        )

        if (!newUser) {
          return res.status(400).json({ message: 'SEM_FAIL_TO_UPDATE_USER' })
        }

        return res.status(200).json(newUser)
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    console.log('error', error)
    res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
