import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteS3Objects } from '@/utils/file.server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ keys: string[] } | { message: string }>
) {
  try {
    const keys = req.body.keys as string[]

    switch (req.method) {
      case 'POST': {
        if (keys.length === 0) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        const deletedResult = await deleteS3Objects(keys, {
          bucket: process.env.DINO_AWS_BUCKET_NAME,
          region: process.env.DINO_AWS_BUCKET_REGION,
          accessKeyId: process.env.DINO_AWS_ACCESS_KEY,
          secretAccessKey: process.env.DINO_AWS_SECRET_KEY
        }).promise()

        const deletedKeys = (deletedResult.Deleted ?? [])
          .map((deletedObject) => deletedObject.Key)
          .filter((key) => key !== undefined) as string[]

        if (deletedKeys.length === 0) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json({ keys: deletedKeys })
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
