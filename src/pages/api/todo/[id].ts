import { dbConnect } from '@/database'
import Todo from '@/models/Todo'

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
        const todo = await Todo.findById(req?.query?.id)

        if (!todo) {
          return res.status(400).json({ status: false })
        }

        res.status(200).json({ status: true, data: todo })

        break
      }

      case 'PUT': {
        const todo = await Todo.findByIdAndUpdate(req?.query?.id, req?.body, {
          new: true,
          runValidators: true
        })

        if (!todo) {
          return res.status(400).json({ status: false })
        }

        res.status(200).json({ status: true, data: todo })

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
