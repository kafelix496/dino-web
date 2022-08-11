import { useEffect, useState } from 'react'

import { POST_MAX_ASSET_WIDTH } from '@/constants/album'
import assetHttpService from '@/http-services/asset'
import type { AssetDefault } from '@/types/album'

export const useAssetsSrc = (assets: AssetDefault[]) => {
  const [assetsWithSrc, setAssetsWithSrc] = useState<AssetDefault[]>(assets)

  useEffect(() => {
    Promise.all<Promise<AssetDefault>[]>(
      assets.map((asset) =>
        assetHttpService
          .getSignedUrl({
            key: asset.key,
            width: POST_MAX_ASSET_WIDTH,
            ...(asset.extension === 'heic' ? { format: 'jpeg' } : {})
          })
          .then(({ url }) => ({ ...asset, src: url as string }))
      )
    ).then((_assetsWithSrc) => setAssetsWithSrc(_assetsWithSrc))
  }, [assets])

  return { assetsWithSrc }
}
