import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { getDownloadUrl } from '@/utils/file'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { key } = req?.query ?? {}

    if (Array.isArray(key)) {
      return res.status(400).json({ status: false })
    }

    const session = await getSession({ req })
    const userId = session?.user?.id
    if (!userId) {
      return res.status(401).json({ status: false })
    }

    switch (req?.method) {
      case 'GET': {
        const url = await getDownloadUrl(key, {
          bucket: process.env.AWS_BUCKET_NAME,
          region: process.env.AWS_BUCKET_REGION,
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_KEY
        })

        return res.status(200).json({ status: true, url })
      }

      default:
        return res.status(405).json({ status: false })
    }
  } catch (error) {
    res.status(400).json({ status: false })
  }
}
