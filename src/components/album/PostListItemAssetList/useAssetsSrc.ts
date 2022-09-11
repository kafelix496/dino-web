import { useEffect, useState } from 'react'

import { useAlbumAssetMaxWidth } from '@/hooks/useAlbumAssetMaxWidth'
import type { AssetDefault } from '@/types/album'
import { getAssetSrc } from '@/utils/album'

export const useAssetsSrc = (assets: AssetDefault[]) => {
  const [refinedAsset, setRefinedAsset] = useState<AssetDefault[]>(assets)
  const { width: albumAssetMaxWidth } = useAlbumAssetMaxWidth()

  useEffect(() => {
    Promise.all<Promise<AssetDefault>[]>(
      assets.map((asset) =>
        getAssetSrc({
          key: asset.key,
          extension: asset.extension,
          width: albumAssetMaxWidth
        }).then((src) => ({ ...asset, src }))
      )
    ).then((asset) => setRefinedAsset(asset))
  }, [assets, albumAssetMaxWidth])

  return { refinedAsset }
}
