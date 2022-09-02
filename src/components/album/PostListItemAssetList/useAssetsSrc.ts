import { useEffect, useState } from 'react'

import type { AssetDefault } from '@/types/album'
import { getAssetUrl } from '@/utils/album'

export const useAssetsSrc = (assets: AssetDefault[]) => {
  const [refinedAsset, setRefinedAsset] = useState<AssetDefault[]>(assets)

  useEffect(() => {
    Promise.all<Promise<AssetDefault>[]>(
      assets.map((asset) =>
        getAssetUrl({ key: asset.key, extension: asset.extension }).then(
          (src) => ({ ...asset, src })
        )
      )
    ).then((asset) => setRefinedAsset(asset))
  }, [assets])

  return { refinedAsset }
}
