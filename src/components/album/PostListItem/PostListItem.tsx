import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import type { FC } from 'react'

import type { Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import DeletePostDialog from '@/components/album/DeletePostDialog/DeletePostDialog'
import PostFormDialog from '@/components/album/PostFormDialog/PostFormDialog'
import PostListItemAssetList from '@/components/album/PostListItemAssetList/PostListItemAssetList'
import MaxHeightMenu from '@/components/mui/MaxHeightMenu/MaxHeightMenu'
import type { MenuOption } from '@/components/mui/MaxHeightMenu/MaxHeightMenu'
import { POST_MAX_WIDTH } from '@/constants/album'
import { Actions } from '@/constants/app'
import { useDialogStatus } from '@/hooks/useDialogStatus'
import { useIsAdminOrAbove, useIsSuperAdmin } from '@/hooks/useIsAdmin'
import type { Post } from '@/types/album'

interface PostListItemProps {
  post: Post
}

const PostListItemTime = dynamic(
  () => import('@/components/album/PostListItemTime/PostListItemTime'),
  { ssr: false }
)

const PostListItem: FC<PostListItemProps> = ({ post }) => {
  const { t } = useTranslation('common')
  const { state, openDialog, closeDialog } = useDialogStatus()
  const { isAdminOrAbove } = useIsAdminOrAbove()
  const { isSuperAdmin } = useIsSuperAdmin()

  const menuOptions: MenuOption[] = new Array<MenuOption>().concat(
    isAdminOrAbove
      ? {
          label: t('EDIT'),
          click: () => {
            openDialog(Actions.EDIT)
          }
        }
      : [],
    isSuperAdmin
      ? {
          label: t('DELETE'),
          click: () => {
            openDialog(Actions.DELETE)
          }
        }
      : []
  )

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

            <Box sx={{ mt: 1 }} />

            <PostListItemTime
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
          </Box>

          {(isAdminOrAbove || isSuperAdmin) && (
            <Box className="__d-flex __d-items-center">
              <MaxHeightMenu options={menuOptions} />
            </Box>
          )}
        </Box>

        {post.description && (
          <Box sx={{ mt: 2 }}>
            <Divider />
            <Typography className="__d-whitespace-pre-wrap" sx={{ mt: 2 }}>
              {post.description}
            </Typography>
          </Box>
        )}

        <Divider sx={{ mt: 2 }} />
        <Box sx={{ mt: 2 }}>
          <PostListItemAssetList assets={post.assets} />
        </Box>

        {/*<Box sx={{ mt: 2 }}>
          <ButtonGroup fullWidth variant="outlined">
            <Button>{t('BUTTON_LIKE')}</Button>
            <Button>{t('BUTTON_COMMENTS')}</Button>
          </ButtonGroup>
        </Box>*/}
      </Paper>

      {isAdminOrAbove && state.name === Actions.EDIT && state.isOpen && (
        <PostFormDialog post={post} closeDialog={closeDialog}></PostFormDialog>
      )}

      {isSuperAdmin && state.name === Actions.DELETE && state.isOpen && (
        <DeletePostDialog
          id={post._id}
          assetKeys={post.assets.map((asset) => asset.key)}
          closeDialog={closeDialog}
        ></DeletePostDialog>
      )}
    </>
  )
}

export default PostListItem
