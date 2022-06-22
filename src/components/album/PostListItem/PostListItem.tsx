import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import type { Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import PostListItemImageList from '@/components/album/PostListItemImageList/PostListItemImageList'
import { POST_WIDTH } from '@/constants/album'
import type { Post } from '@/types/album'
import { getCreatedAtTxt } from '@/utils'

interface PostListItemProps {
  post: Post
}

const PostListItem: FC<PostListItemProps> = ({ post }) => {
  const { t } = useTranslation('common')

  return (
    <Paper
      key={post._id}
      sx={{
        padding: (theme: Theme) => theme.spacing(2),
        marginTop: (theme: Theme) => theme.spacing(4),
        width: POST_WIDTH,
        maxWidth: '100%'
      }}
    >
      <Box className="__d-flex">
        <Box className="__d-flex __d-items-center __d-grow">
          <Typography>{post.title}</Typography>
        </Box>
        <Box className="__d-flex __d-items-center">
          <Typography variant="caption">
            {getCreatedAtTxt(t, post.createdAt)}
          </Typography>
        </Box>
      </Box>

      {post.description ? (
        <Box sx={{ mt: 2 }}>
          <Divider />
          <Typography sx={{ mt: 2 }}>{post.description}</Typography>
        </Box>
      ) : null}

      <Divider sx={{ mt: 2 }} />
      <Box sx={{ mt: 2 }}>
        <PostListItemImageList assets={post.assets} />
      </Box>

      <Box sx={{ mt: 2 }}>
        <ButtonGroup fullWidth variant="outlined">
          <Button>{t('BUTTON_LIKE')}</Button>
          <Button>{t('BUTTON_COMMENTS')}</Button>
        </ButtonGroup>
      </Box>
    </Paper>
  )
}

export default PostListItem
