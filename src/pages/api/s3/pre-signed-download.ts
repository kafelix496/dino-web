import type { NextApiRequest, NextApiResponse } from 'next'

import { getDownloadUrl } from '@/utils/file'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ url: string } | { message: string }>
) {
  try {
    const key = req.query.key as string

    switch (req.method) {
      case 'GET': {
        const url = await getDownloadUrl(key, {
          bucket: process.env.DINO_AWS_BUCKET_NAME,
          region: process.env.DINO_AWS_BUCKET_REGION,
          accessKeyId: process.env.DINO_AWS_ACCESS_KEY,
          secretAccessKey: process.env.DINO_AWS_SECRET_KEY
        })

        return res.status(200).json({ url })
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
