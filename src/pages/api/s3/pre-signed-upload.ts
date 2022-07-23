import { PresignedPost } from 'aws-sdk/clients/s3'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getUploadUrl } from '@/utils/file'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { url: string; fields: PresignedPost.Fields } | { message: string }
  >
) {
  try {
    const key = req.query.key as string

    switch (req.method) {
      case 'GET': {
        const { url, fields } = getUploadUrl(key, {
          bucket: process.env.DINO_AWS_BUCKET_NAME,
          region: process.env.DINO_AWS_BUCKET_REGION,
          accessKeyId: process.env.DINO_AWS_ACCESS_KEY,
          secretAccessKey: process.env.DINO_AWS_SECRET_KEY
        })

        return res.status(200).json({ url, fields })
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
