import dynamic from 'next/dynamic'
import type { FC } from 'react'

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

interface PostFormDialogAssetListProps {
  files: Blob[]
}

const PostFormDialogAssetListItem = dynamic(
  () =>
    import(
      '@/components/album/PostFormDialogAssetListItem/PostFormDialogAssetListItem'
    ),
  { ssr: false }
)

const PostFormDialogAssetList: FC<PostFormDialogAssetListProps> = ({
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
          <PostFormDialogAssetListItem file={file} />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default PostFormDialogAssetList
