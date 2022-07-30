import head from 'ramda/src/head'
import type { FC } from 'react'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Skeleton from '@mui/material/Skeleton'

import PostListItemAssetListItemForCount1 from '@/components/album/PostListItemAssetListForCount1/PostListItemAssetListItemForCount1'
import { POST_ROW_HEIGHT } from '@/constants/album'
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
      return <PostListItemAssetListItemForCount1 asset={head(assetsWithSrc)!} />
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
              <ImageListItem key={asset._id}>
                {!asset.src && (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={POST_ROW_HEIGHT}
                  />
                )}

                {asset.src && <img src={asset.src} />}
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
            cols={2}
            gap={GAP}
            rowHeight={POST_ROW_HEIGHT}
          >
            {assetsWithSrc.map((asset, index) => (
              <ImageListItem key={asset._id} cols={index === 0 ? 2 : 1}>
                {!asset.src && (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={POST_ROW_HEIGHT}
                  />
                )}

                {asset.src && <img src={asset.src} />}
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
            rowHeight={POST_ROW_HEIGHT}
          >
            {assetsWithSrc.slice(0, 4).map((asset, index) => (
              <ImageListItem key={asset._id}>
                {!asset.src && (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={POST_ROW_HEIGHT}
                  />
                )}

                {asset.src &&
                  (index < 3 ||
                    (index === 3 && assetsWithSrc.length === 4)) && (
                    <img src={asset.src} />
                  )}

                {asset.src && index === 3 && assetsWithSrc.length > 4 && (
                  <Box sx={{ height: POST_ROW_HEIGHT }}>
                    <img
                      src={asset.src}
                      className="__d-w-full __d-h-full __d-object-cover __d-opacity-75"
                    />
                    <AddIcon
                      className="__d-absolute"
                      fontSize="large"
                      sx={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  </Box>
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )
    }
  }
}

export default PostListItemAssetList
