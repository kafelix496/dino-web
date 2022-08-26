import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import ImageListItem from '@mui/material/ImageListItem'
import Skeleton from '@mui/material/Skeleton'

import { POST_ROW_HEIGHT, PostAssetTargets } from '@/constants/album'
import { FileTypes } from '@/constants/app'
import type { AssetDefault } from '@/types/album'

interface PostAssetProps {
  cols?: number
  target: PostAssetTargets
  withAddIcon: boolean
  asset: AssetDefault
}

const PostAsset: FC<PostAssetProps> = ({
  cols,
  target,
  withAddIcon,
  asset
}) => {
  const router = useRouter()
  const [isAssetLoading, setIsAssetLoading] = useState(true)

  const hasSrc = !!asset.src
  const isImage = asset.type === FileTypes.IMAGE
  const isVideo = asset.type === FileTypes.VIDEO

  const handleClickAsset = () => {
    if (
      target === PostAssetTargets.SINGLE ||
      target === PostAssetTargets.MULTIPLE
    ) {
      router.replace(
        {
          query: {
            ...router.query,
            assetId: asset._id
          }
        },
        undefined,
        { shallow: true }
      )
    }
  }

  return (
    <ImageListItem
      cols={cols ?? 1}
      className={
        target === PostAssetTargets.SINGLE ||
        target === PostAssetTargets.MULTIPLE
          ? '__d-relative'
          : ''
      }
      sx={
        target === PostAssetTargets.DETAIL
          ? {
              display: 'initial',
              width: '100% !important',
              height: '100% !important'
            }
          : {}
      }
    >
      <Box
        className={
          '__d-h-full' +
          (target === PostAssetTargets.SINGLE ||
          target === PostAssetTargets.MULTIPLE
            ? ' __d-cursor-pointer'
            : '')
        }
        onClick={handleClickAsset}
      >
        {(!hasSrc || isAssetLoading) && <Skeleton width="100%" height="100%" />}

        {isImage && hasSrc && (
          <img
            className={
              '__d-w-full __d-h-full' +
              (withAddIcon ? ' __d-opacity-50' : '') +
              (target === PostAssetTargets.DETAIL
                ? ' __d-object-contain'
                : ' __d-object-cover')
            }
            src={asset.src}
            style={{
              display: isAssetLoading ? 'none' : '',
              ...(target === PostAssetTargets.SINGLE
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
            controls={target === PostAssetTargets.DETAIL}
            className={
              '__d-w-full __d-h-full' +
              (withAddIcon ? ' __d-opacity-50' : '') +
              (target === PostAssetTargets.DETAIL
                ? ' __d-object-contain'
                : ' __d-object-cover')
            }
            src={asset.src}
            style={{
              display: isAssetLoading ? 'none' : '',
              ...(target === PostAssetTargets.SINGLE
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
    </ImageListItem>
  )
}

export default PostAsset
