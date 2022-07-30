import { useEffect, useState } from 'react'

import type { AssetDefault } from '@/types/album'
import { getFileUrl, heicToPng, urlToBlob } from '@/utils/file'

export const useAssetsSrc = (assets: AssetDefault[]) => {
  const [assetsWithSrc, setAssetsWithSrc] = useState<AssetDefault[]>(assets)

  useEffect(() => {
    Promise.all<Promise<AssetDefault>[]>(
      assets.map(
        (asset) =>
          new Promise((resolve) => {
            getFileUrl(asset.key)
              .then(({ url }) => {
                if (asset.extension === 'heic') {
                  return urlToBlob(url)
                    .then((blob) => heicToPng(blob))
                    .then((blob) => URL.createObjectURL(blob as Blob))
                }

                return url
              })
              .then((url) => {
                resolve({ ...asset, src: url as string })
              })
          })
      )
    ).then((_assetsWithSrc) => setAssetsWithSrc(_assetsWithSrc))
  }, [assets])

  return { assetsWithSrc }
}
