import type { FC } from 'react'

import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

import type { Post } from '@/types/album'

const GAP = 16
const ROW_HEIGHT = 250

interface PostListItemImageListProps {
  assets: Post['assets']
}

const PostListItemImageList: FC<PostListItemImageListProps> = ({ assets }) => {
  switch (assets.length) {
    case 1: {
      return (
        <Box
          className="__d-relative"
          sx={{ textAlign: 'center', maxHeight: ROW_HEIGHT * 2 }}
        >
          <img src={assets[0].src} />
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
            {assets.map((asset) => (
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
              <img src={assets[0].src} />
            </ImageListItem>
          </ImageList>
          <ImageList
            variant="quilted"
            cols={2}
            gap={GAP}
            rowHeight={ROW_HEIGHT}
          >
            {assets.slice(1).map((asset) => (
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
            {assets.map((asset) => (
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
