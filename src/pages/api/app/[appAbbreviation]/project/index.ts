import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { Apps } from '@/constants'
import { CollectionName } from '@/constants/collection'
import projectSchema from '@/models/common/projectSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { Project } from '@/types'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | Project[] | { message: string }>
) {
  try {
    const session = await getSession({ req })
    const userId = session?.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'SEM_NOT_AUTHORIZED_USER' })
    }

    const targetAppAbbreviation = req.query.appAbbreviation
    // NOTE: 496-1
    // only money tracker can execute below codes
    if (targetAppAbbreviation !== Apps.moneyTracker) {
      return res.status(400).json({ message: 'SEM_QUERY_NOT_ALLOWED' })
    }

    await dbConnect()

    const ProjectDoc = createDocument(
      `${targetAppAbbreviation}.${CollectionName.PROJECT}`,
      projectSchema
    )

    switch (req?.method) {
      case 'GET': {
        const projects = await ProjectDoc.find({
          $or: [
            { ownerId: userId },
            { accessUsers: { $elemMatch: { accessUserId: userId } } }
          ]
        })

        if (!projects) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json(projects)
      }

      case 'POST': {
        const project: Project = await ProjectDoc.create({
          ...(req?.body ?? {}),
          ownerId: userId
        })

        if (!project) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(201).json(project)
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
