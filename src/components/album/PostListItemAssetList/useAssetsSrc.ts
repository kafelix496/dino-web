import { useEffect, useState } from 'react'

import type { AssetDefault } from '@/types/album'
import { getAssetUrl } from '@/utils/album'

export const useAssetsSrc = (assets: AssetDefault[]) => {
  const [assetsWithSrc, setAssetsWithSrc] = useState<AssetDefault[]>(assets)

  useEffect(() => {
    Promise.all<Promise<AssetDefault>[]>(
      assets.map((asset) =>
        getAssetUrl({ key: asset.key, extension: asset.extension }).then(
          (src) => ({
            ...asset,
            src
          })
        )
      )
    ).then((_assetsWithSrc) => setAssetsWithSrc(_assetsWithSrc))
  }, [assets])

  return { assetsWithSrc }
}
