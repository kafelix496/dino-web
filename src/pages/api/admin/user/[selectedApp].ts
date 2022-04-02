import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

// import { Apps } from '@/constants'
import { CollectionName } from '@/constants/collection'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
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

    const selectedApp = req.query.selectedApp
    console.log('selectedApp', selectedApp)

    await dbConnect()

    const UserDoc = createDocument(CollectionName.USER, userSchema)

    switch (req?.method) {
      case 'GET': {
        const users = await UserDoc.find()

        if (!users) {
          return res.status(400).json({ message: 'SEM_FAIL_TO_FIND_USERS' })
        }

        return res.status(200).json(users)
      }

      // case 'POST': {
      //   const project = await UserDoc.create({
      //     ...(req?.body ?? {}),
      //     ownerId: userId
      //   })

      //   if (!project) {
      //     return res.status(400).json({ status: false })
      //   }

      //   return res.status(201).json({ status: true, project })
      // }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
