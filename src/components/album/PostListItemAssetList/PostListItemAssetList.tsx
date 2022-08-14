import head from 'ramda/src/head'
import type { FC } from 'react'

import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'

import PostAsset from '@/components/album/PostAsset/PostAsset'
import { POST_ROW_HEIGHT, PostAssetTargets } from '@/constants/album'
import type { AssetDefault } from '@/types/album'

import { useAssetsSrc } from './useAssetsSrc'

interface PostListItemAssetListProps {
  assets: AssetDefault[]
}

const GAP = 16

const PostListItemAssetList: FC<PostListItemAssetListProps> = ({ assets }) => {
  const { assetsWithSrc } = useAssetsSrc(assets)

  switch (assetsWithSrc.length) {
    case 1: {
      return (
        <Box>
          <ImageList
            variant="quilted"
            cols={1}
            gap={GAP}
            rowHeight={POST_ROW_HEIGHT * 2}
          >
            <PostAsset
              target={PostAssetTargets.SINGLE}
              withAddIcon={false}
              asset={head(assetsWithSrc)!}
            />
          </ImageList>
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
            rowHeight={POST_ROW_HEIGHT}
          >
            {assetsWithSrc.map((asset) => (
              <PostAsset
                key={asset._id}
                target={PostAssetTargets.MULTIPLE}
                withAddIcon={false}
                asset={asset}
              />
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
            cols={2}
            gap={GAP}
            rowHeight={POST_ROW_HEIGHT}
          >
            {assetsWithSrc.map((asset, index) => (
              <PostAsset
                key={asset._id}
                cols={index === 0 ? 2 : 1}
                target={PostAssetTargets.MULTIPLE}
                withAddIcon={false}
                asset={asset}
              />
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
            rowHeight={POST_ROW_HEIGHT}
          >
            {assetsWithSrc.slice(0, 4).map((asset, index) => (
              <PostAsset
                key={asset._id}
                target={PostAssetTargets.MULTIPLE}
                withAddIcon={index === 3 && assetsWithSrc.length > 4}
                asset={asset}
              />
            ))}
          </ImageList>
        </Box>
      )
    }
  }
}

export default PostListItemAssetList
