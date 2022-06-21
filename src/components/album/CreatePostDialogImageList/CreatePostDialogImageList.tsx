import { memo } from 'react'
import type { FC } from 'react'

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

interface CreatePostDialogImageListProps {
  files: Blob[]
}

const CreatePostDialogImageList: FC<CreatePostDialogImageListProps> = ({
  files
}) => {
  if (files.length) {
    return (
      <ImageList
        variant="quilted"
        cols={5}
        gap={4}
        rowHeight={50}
        sx={{ maxHeight: 110 }}
      >
        {Array.from(files as Blob[]).map((file, index) => (
          <ImageListItem key={index}>
            {/^image/.test(file.type) ? (
              <img src={URL.createObjectURL(file)} />
            ) : (
              <video
                src={URL.createObjectURL(file)}
                style={{ width: 70, height: 50 }}
              />
            )}
          </ImageListItem>
        ))}
      </ImageList>
    )
  }

  return <></>
}

export default memo(CreatePostDialogImageList)
