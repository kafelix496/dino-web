import dynamic from 'next/dynamic'
import type { FC } from 'react'

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

interface CreatePostDialogAssetListProps {
  files: Blob[]
}

const CreatePostDialogAssetListItem = dynamic(
  () =>
    import(
      '@/components/album/CreatePostDialogAssetListItem/CreatePostDialogAssetListItem'
    ),
  { ssr: false }
)

const CreatePostDialogAssetList: FC<CreatePostDialogAssetListProps> = ({
  files
}) => {
  if (!files.length) {
    return <></>
  }

  return (
    <ImageList
      variant="quilted"
      cols={5}
      gap={4}
      rowHeight={50}
      sx={{ maxHeight: 110 }}
    >
      {Array.from(files).map((file, index) => (
        <ImageListItem key={index} className="__d-text-center">
          <CreatePostDialogAssetListItem file={file} />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default CreatePostDialogAssetList
