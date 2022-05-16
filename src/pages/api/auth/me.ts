import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { CollectionsName } from '@/constants/collection'
import userSchema from '@/models/common/userSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { User } from '@/types'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string }>
) {
  try {
    const token = await getToken({ req })
    const userId: string | undefined = token?.sub

    await dbConnect()

    switch (req.method) {
      case 'GET': {
        const userDoc = createDocument(CollectionsName.USER, userSchema)

        const user: User = await userDoc.findOne({ _id: userId })

        return res.status(200).json(user)
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
