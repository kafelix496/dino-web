import { useEffect, useState } from 'react'
import type { FC } from 'react'

import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

import type { AssetDefault } from '@/types/album'
import { getFileUrl } from '@/utils/file'

const GAP = 16
const ROW_HEIGHT = 250

interface PostListItemImageListProps {
  assets: AssetDefault[]
}

const PostListItemImageList: FC<PostListItemImageListProps> = ({ assets }) => {
  const [assetsWithSrc, setAssetsWithSrc] = useState<AssetDefault[]>(assets)

  useEffect(() => {
    Promise.all<Promise<AssetDefault>[]>(
      assets.map(
        (asset) =>
          new Promise((resolve) => {
            getFileUrl(asset.key).then(({ url }) => {
              resolve({ ...asset, src: url })
            })
          })
      )
    ).then((_assetsWithSrc) => setAssetsWithSrc(_assetsWithSrc))
  }, [assets])

  switch (assetsWithSrc.length) {
    case 1: {
      return (
        <Box
          className="__d-relative"
          sx={{ textAlign: 'center', maxHeight: ROW_HEIGHT * 2 }}
        >
          <img src={assetsWithSrc[0].src} style={{ maxWidth: '100%' }} />
        </Box>
      )
    }

    case 2: {
      return (
        <Box>
          <ImageList
            variant="quilted"
            cols={1}
            gap={GAP}
            rowHeight={ROW_HEIGHT}
          >
            {assetsWithSrc.map((asset) => (
              <ImageListItem key={asset._id}>
                <img src={asset.src} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )
    }

    case 3: {
      return (
        <Box>
          <ImageList
            variant="quilted"
            cols={1}
            gap={GAP}
            rowHeight={ROW_HEIGHT}
          >
            <ImageListItem>
              <img src={assetsWithSrc[0].src} />
            </ImageListItem>
          </ImageList>
          <ImageList
            variant="quilted"
            cols={2}
            gap={GAP}
            rowHeight={ROW_HEIGHT}
          >
            {assetsWithSrc.slice(1).map((asset) => (
              <ImageListItem key={asset._id}>
                <img src={asset.src} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )
    }

    default: {
      return (
        <Box>
          <ImageList
            variant="quilted"
            cols={2}
            gap={GAP}
            rowHeight={ROW_HEIGHT}
          >
            {assetsWithSrc.map((asset) => (
              <ImageListItem key={asset._id}>
                <img src={asset.src} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )
    }
  }
}

export default PostListItemImageList
