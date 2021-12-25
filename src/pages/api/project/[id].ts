import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

import { dbConnect } from '@/utils/db-utils'
import { isValidAppType } from '@/utils'
import projectSchema from '@/models/common/projectSchema'
import { createDocument } from '@/models/utils/createDocument'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, app_type: appType } = req?.query ?? {}
    if (!id || !isValidAppType(appType)) {
      return res.status(400).json({ status: false })
    }

    const session = await getSession({ req })
    const userId = session?.user?.id
    if (!userId) {
      return res.status(401).json({ status: false })
    }

    await dbConnect()

    const ProjectDoc = createDocument(`${appType}.project`, projectSchema)

    switch (req?.method) {
      case 'GET': {
        const project = await ProjectDoc.findOne({
          $and: [
            { _id: id },
            {
              $or: [
                { ownerId: userId },
                { accessUsers: { $elemMatch: { accessUserId: userId } } }
              ]
            }
          ]
        })

        if (!project) {
          return res.status(400).json({ status: false })
        }

        return res.status(200).json({ status: true, project })
      }

      case 'PUT': {
        const project = await ProjectDoc.findByIdAndUpdate(id, req?.body, {
          new: true,
          runValidators: true
        })

        if (!project) {
          return res.status(400).json({ status: false })
        }

        return res.status(200).json({ status: true, project })
      }

      case 'DELETE': {
        const project = await ProjectDoc.deleteOne({
          $and: [
            { _id: id },
            {
              $or: [
                { ownerId: userId },
                { accessUsers: { $elemMatch: { accessUserId: userId } } }
              ]
            }
          ]
        })

        if (!project) {
          return res.status(400).json({ status: false })
        }

        return res.status(200).json({ status: true, project })
      }

      default:
        break
    }

    return res.status(400).json({ status: false })
  } catch (error) {
    res.status(400).json({ status: false })
  }
}
