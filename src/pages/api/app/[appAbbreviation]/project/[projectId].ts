import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

import { Apps } from '@/constants'
import { CollectionName } from '@/constants/collection'
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
    const currentUserId = token?.sub
    if (!currentUserId) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }

    const { appAbbreviation: appAbbreviation, projectId } = req.query
    // NOTE: 496-1
    // only money tracker can execute below codes
    if (appAbbreviation !== Apps.moneyTracker) {
      return res.status(400).json({ message: 'SEM_QUERY_NOT_ALLOWED' })
    }

    await dbConnect()

    const ProjectDoc = createDocument(
      `${appAbbreviation}.${CollectionName.PROJECT}`,
      projectSchema
    )

    switch (req?.method) {
      case 'GET': {
        const project = await ProjectDoc.findOne({
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
        const { title, description } = req?.body ?? {}

        const project: Project = await ProjectDoc.findOneAndUpdate(
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
          { title: title ?? '', description: description ?? '' },
          { new: true, runValidators: true }
        )

        if (!project) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json(project)
      }

      case 'DELETE': {
        const deleteResult = await ProjectDoc.deleteOne({
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

        if (!deleteResult) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).end()
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
