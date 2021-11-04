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
        const todos = await Todo.find({})

        res.status(200).json({ status: true, data: todos })

        break
      }

      case 'POST': {
        const todo = await Todo.create(req?.body)

        res.status(201).json({ status: true, data: todo })

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
