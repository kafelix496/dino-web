import type { NextApiRequest, NextApiResponse } from 'next'

import { Apps } from '@/constants'
import { CollectionsName } from '@/constants/collection'
import assetSchema from '@/models/album/assetSchema'
import { createDocument } from '@/models/utils/createDocument'
import type { Asset } from '@/types/album'
import { dbConnect } from '@/utils/db-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Asset | { message?: string }>
) {
  try {
    const { appAbbreviation, assetId } = req.query as {
      appAbbreviation: Apps
      assetId: unknown
    }
    if (appAbbreviation !== Apps.familyAlbum) {
      return res.status(400).json({ message: 'SEM_QUERY_NOT_ALLOWED' })
    }

    await dbConnect()

    switch (req?.method) {
      case 'GET': {
        const assetDoc = createDocument(
          CollectionsName.ALBUM_ASSET,
          assetSchema
        )

        const asset: Asset = await assetDoc.findOne({ _id: assetId })

        if (!asset) {
          return res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
        }

        return res.status(200).json(asset)
      }

      default:
        return res.status(405).json({ message: 'SEM_METHOD_NOT_ALLOWED' })
    }
  } catch (error) {
    res.status(400).json({ message: 'SEM_UNEXPECTED_ERROR' })
  }
}
