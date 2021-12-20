import { dbConnect } from '@/utils/db-utils'
import Project from '@/models/money-traker/project'

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: boolean
  data?: { title: string }[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await dbConnect()

    switch (req?.method) {
      case 'GET': {
        const projects = await Project.find({})

        res.status(200).json({ status: true, data: projects })

        break
      }

      case 'POST': {
        const project = await Project.create(req?.body)

        res.status(201).json({ status: true, data: project })

        break
      }

      default:
        res.status(400).json({ status: false })

        break
    }
  } catch (error) {
    res.status(400).json({ status: false })
  }
}
