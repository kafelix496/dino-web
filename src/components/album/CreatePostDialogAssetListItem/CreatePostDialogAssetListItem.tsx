import { useEffect, useState } from 'react'
import type { FC } from 'react'

import Skeleton from '@mui/material/Skeleton'

import { FileInputExtensions } from '@/constants/app'
import { heicToPng, isImageFileType, isVideoFileType } from '@/utils/file'

interface CreatePostDialogAssetListItemProps {
  file: Blob
}

const CreatePostDialogAssetListItem: FC<CreatePostDialogAssetListItemProps> = ({
  file
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [src, setSrc] = useState('')
  const isImage = isImageFileType(file)
  const isVideo = isVideoFileType(file)

  useEffect(() => {
    setIsLoading(true)

    if (file.type === FileInputExtensions.HEIC) {
      heicToPng(file).then((blob) => {
        setSrc(URL.createObjectURL(blob as Blob))
      })
    } else {
      setSrc(URL.createObjectURL(file))
    }
  }, [file])

  return (
    <>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />
      )}

      {isImage && (
        <img
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            display: isLoading ? 'none' : ''
          }}
          src={src}
          onLoad={() => {
            setIsLoading(false)
          }}
        />
      )}

      {isVideo && (
        <video
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            display: isLoading ? 'none' : ''
          }}
          src={src}
          onLoadStart={() => {
            setIsLoading(false)
          }}
        />
      )}
    </>
  )
}

export default CreatePostDialogAssetListItem
