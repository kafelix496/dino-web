import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import mongoose from 'mongoose'

import { dbConnect } from '@/utils/db-utils'
import projectSchema from '@/models/common/projectSchema'
import { Projects } from '@/global-types/index'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, type } = req?.query ?? {}
    if (!id || !Object.values(Projects).includes(type as Projects)) {
      return res.status(400).json({ status: false })
    }

    const session = await getSession({ req })
    const userId = session?.user?.id
    if (!userId) {
      return res.status(401).json({ status: false })
    }

    await dbConnect()

    const ProjectModel =
      mongoose.models[`${type}.project`] ||
      mongoose.model(`${type}.project`, projectSchema)

    switch (req?.method) {
      case 'GET': {
        const project = await ProjectModel.findOne({
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
        const project = await ProjectModel.findByIdAndUpdate(id, req?.body, {
          new: true,
          runValidators: true
        })

        if (!project) {
          return res.status(400).json({ status: false })
        }

        return res.status(200).json({ status: true, project })
      }

      case 'DELETE': {
        const project = await ProjectModel.deleteOne({
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
