import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { Apps } from '@/constants'
import { CollectionsName } from '@/constants/collection'
import projectSchema from '@/models/common/projectSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { Project } from '@/types'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | { message: string }>
) {
  try {
    const token = await getToken({ req })
    const currentUserId = token!.sub!
    const { appAbbreviation, projectId } = req.query as {
      appAbbreviation: Apps
      projectId: unknown
    }
    // NOTE: 496-1
    // only money tracker can execute below codes
    if (appAbbreviation !== Apps.moneyTracker) {
      return res.status(400).json({ message: 'SEM_QUERY_NOT_ALLOWED' })
    }

    await dbConnect()

    const projectDoc = createDocument(
      `${appAbbreviation}.${CollectionsName.PROJECT}`,
      projectSchema
    )

    switch (req.method) {
      case 'GET': {
        const project = await projectDoc.findOne({
          $and: [
            { _id: projectId },
            {
              $or: [
                { ownerId: currentUserId },
                { accessUsers: { $elemMatch: { accessUserId: currentUserId } } }
              ]
            }
          ]
        })

        if (!project) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json(project)
      }

      case 'PUT': {
        const { title, description } = req.body ?? {}

        const project: Project | null = await projectDoc.findOneAndUpdate(
          {
            $and: [
              { _id: projectId },
              {
                $or: [
                  { ownerId: currentUserId },
                  {
                    accessUsers: { $elemMatch: { accessUserId: currentUserId } }
                  }
                ]
              }
            ]
          },
          { title, description: description ?? '' },
          { new: true, runValidators: true }
        )

        if (!project) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json(project)
      }

      case 'DELETE': {
        await projectDoc.findOneAndDelete({
          $and: [
            { _id: projectId },
            {
              $or: [
                { ownerId: currentUserId },
                { accessUsers: { $elemMatch: { accessUserId: currentUserId } } }
              ]
            }
          ]
        })

        return res.status(200).end()
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
