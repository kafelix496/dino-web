import { getSession } from 'next-auth/client'

import { dbConnect } from '@/utils/db-utils'
import Project from '@/models/project'

import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * 1. If user isn't signed in, it will be returned with 401 error.
 * 2. If projectId is passed as query parameter with GET method,
 *    it will return matching project if current signed in user has access.
 * 3. If projectId is not passed as query parameter with GET method,
 *    it will return every project that current signed in user has access.
 * 4. If any unexpected thing happens, it will be return with 400 error.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req })
    const userId = session?.user?.id
    if (!userId) {
      return res.status(401).json({ status: false })
    }

    await dbConnect()

    switch (req?.method) {
      case 'GET': {
        const projects = await Project.find({
          $or: [
            { ownerId: userId },
            { accessUsers: { $elemMatch: { accessUserId: userId } } }
          ]
        })

        if (!projects) {
          return res.status(400).json({ status: false })
        }

        return res.status(200).json({ status: true, projects })
      }

      case 'POST': {
        const project = await Project.create({
          ...(req?.body ?? {}),
          ownerId: userId
        })

        if (!project) {
          return res.status(400).json({ status: false })
        }

        return res.status(201).json({ status: true, project })
      }

      default:
        break
    }

    return res.status(400).json({ status: false })
  } catch (error) {
    res.status(400).json({ status: false })
  }
}
