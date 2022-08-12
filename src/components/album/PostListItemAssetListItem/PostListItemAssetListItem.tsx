import type { FC } from 'react'
import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import ImageListItem from '@mui/material/ImageListItem'
import type { ImageListItemProps } from '@mui/material/ImageListItem'
import Skeleton from '@mui/material/Skeleton'
import { styled } from '@mui/material/styles'

import { POST_ROW_HEIGHT } from '@/constants/album'
import { FileTypes } from '@/constants/app'
import type { AssetDefault } from '@/types/album'

interface PostListItemAssetListItemProps {
  cols?: number
  isSingle: boolean
  withAddIcon: boolean
  asset: AssetDefault
}

const CustomizedImageListItem = styled((props: ImageListItemProps) => (
  <ImageListItem {...props}></ImageListItem>
))`
  .MuiImageListItem-root {
    position: relative;
  }
`

const PostListItemAssetListItem: FC<PostListItemAssetListItemProps> = ({
  cols,
  isSingle,
  withAddIcon,
  asset
}) => {
  const [isAssetLoading, setIsAssetLoading] = useState(true)

  const hasSrc = !!asset.src
  const isImage = asset.type === FileTypes.IMAGE
  const isVideo = asset.type === FileTypes.VIDEO

  return (
    <CustomizedImageListItem cols={cols ?? 1}>
      <Box sx={{ height: isSingle ? POST_ROW_HEIGHT * 2 : POST_ROW_HEIGHT }}>
        {(!hasSrc || isAssetLoading) && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
          />
        )}

        {isImage && hasSrc && (
          <img
            className={
              '__d-w-full __d-h-full __d-object-cover' +
              (withAddIcon ? ' __d-opacity-50' : '')
            }
            src={asset.src}
            style={{
              display: isAssetLoading ? 'none' : '',
              ...(isSingle
                ? {
                    objectFit: 'contain',
                    maxWidth: '100%',
                    maxHeight: POST_ROW_HEIGHT * 2
                  }
                : {})
            }}
            onError={() => {
              setIsAssetLoading(false)
            }}
            onLoad={() => {
              setIsAssetLoading(false)
            }}
          />
        )}

        {isVideo && hasSrc && (
          <video
            className={
              '__d-w-full __d-h-full __d-object-cover' +
              (withAddIcon ? ' __d-opacity-50' : '')
            }
            src={asset.src}
            style={{
              display: isAssetLoading ? 'none' : '',
              ...(isSingle
                ? {
                    maxWidth: '100%',
                    maxHeight: POST_ROW_HEIGHT * 2
                  }
                : {})
            }}
            onError={() => {
              setIsAssetLoading(false)
            }}
            onLoadedMetadata={() => {
              setIsAssetLoading(false)
            }}
          />
        )}

        {withAddIcon && !isAssetLoading && (
          <Box
            className="__d-absolute __d-w-full __d-h-full"
            sx={{ left: 0, top: 0 }}
          >
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
      </Box>
    </CustomizedImageListItem>
  )
}

export default PostListItemAssetListItem
