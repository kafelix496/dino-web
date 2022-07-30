import type { FC } from 'react'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

import { POST_ROW_HEIGHT } from '@/constants/album'
import type { AssetDefault } from '@/types/album'

interface PostListItemAssetListItemForCount1Props {
  asset: AssetDefault
}

const PostListItemAssetListItemForCount1: FC<
  PostListItemAssetListItemForCount1Props
> = ({ asset }) => {
  const [isAssetLoaded, setIsAssetLoaded] = useState(false)

  const hasSrc = !!asset.src

  return (
    <Box
      className="__d-relative"
      sx={{ textAlign: 'center', maxHeight: POST_ROW_HEIGHT * 2 }}
    >
      {(!hasSrc || !isAssetLoaded) && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={POST_ROW_HEIGHT * 2}
        />
      )}

      {hasSrc && (
        <img
          src={asset.src}
          style={{
            maxWidth: '100%',
            maxHeight: POST_ROW_HEIGHT * 2,
            display: !isAssetLoaded ? 'none' : ''
          }}
          onLoad={() => {
            setIsAssetLoaded(true)
          }}
        />
      )}

      {/* TODO: add video */}
    </Box>
  )
}

export default PostListItemAssetListItemForCount1
