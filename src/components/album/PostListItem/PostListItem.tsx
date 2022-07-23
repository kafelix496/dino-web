import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import type { Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import DeletePostDialog from '@/components/album/DeletePostDialog/DeletePostDialog'
import PostListItemImageList from '@/components/album/PostListItemImageList/PostListItemImageList'
import MaxHeightMenu from '@/components/mui/MaxHeightMenu/MaxHeightMenu'
import type { MenuOption } from '@/components/mui/MaxHeightMenu/MaxHeightMenu'
import { POST_MAX_WIDTH } from '@/constants/album'
import useDialogStatus from '@/hooks/useDialogStatus'
import type { Post } from '@/types/album'
import { getCreatedAtTxt, getUpdatedAtTxt } from '@/utils'

interface PostListItemProps {
  post: Post
}

const PostListItem: FC<PostListItemProps> = ({ post }) => {
  const { t } = useTranslation('common')
  const {
    state: deleteCategoryDialogState,
    handleOpen: handleDeleteCategoryOpen,
    handleClose: handleDeleteCategoryClose
  } = useDialogStatus()

  const menuOptions: MenuOption[] = [
    {
      label: t('DELETE'),
      click: () => {
        handleDeleteCategoryOpen()
      }
    }
  ]

  return (
    <>
      <Paper
        key={post._id}
        sx={{
          padding: (theme: Theme) => theme.spacing(2),
          marginTop: (theme: Theme) => theme.spacing(4),
          width: '90%',
          maxWidth: POST_MAX_WIDTH
        }}
      >
        <Box className="__d-flex">
          <Box className="__d-flex __d-flex-col __d-justify-center __d-grow">
            <Typography>{post.title}</Typography>

            <Typography variant="caption" sx={{ mt: 1 }}>
              {getCreatedAtTxt(t, post.createdAt)}
            </Typography>

            <Typography variant="caption">
              {getUpdatedAtTxt(t, post.createdAt)}
            </Typography>
          </Box>

          <Box className="__d-flex __d-items-center">
            <Typography
              variant="caption"
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              {getCreatedAtTxt(t, post.createdAt)}
            </Typography>

            <MaxHeightMenu options={menuOptions} />
          </Box>
        </Box>

        {post.description && (
          <Box sx={{ mt: 2 }}>
            <Divider />
            <Typography sx={{ mt: 2 }}>{post.description}</Typography>
          </Box>
        )}

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

      <DeletePostDialog
        id={post._id}
        isOpen={deleteCategoryDialogState.isOpen}
        handleClose={handleDeleteCategoryClose}
      ></DeletePostDialog>
    </>
  )
}

export default PostListItem
