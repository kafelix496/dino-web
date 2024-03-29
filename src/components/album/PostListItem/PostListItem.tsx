import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import type { FC } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { DeletePostDialog } from '@/components/album/DeletePostDialog/DeletePostDialog'
import { PostFormDialog } from '@/components/album/PostFormDialog/PostFormDialog'
import { PostListItemAssetList } from '@/components/album/PostListItemAssetList/PostListItemAssetList'
import { PostListItemCategoryList } from '@/components/album/PostListItemCategoryList/PostListItemCategoryList'
import type { PostListItemTimeProps } from '@/components/album/PostListItemTime/PostListItemTime'
import { MaxHeightMenu } from '@/components/shared/MaxHeightMenu/MaxHeightMenu'
import type { MenuOption } from '@/components/shared/MaxHeightMenu/MaxHeightMenu'
import { Actions } from '@/constants/app'
import { useDialogStatus } from '@/hooks/useDialogStatus'
import { useIsAdminOrAbove, useIsSuperAdmin } from '@/hooks/usePermission'
import type { Post } from '@/types/album'

interface PostListItemProps {
  post: Post
}

const PostListItemTime = dynamic<PostListItemTimeProps>(
  () =>
    import('@/components/album/PostListItemTime/PostListItemTime').then(
      (mod) => mod.PostListItemTime
    ),
  { ssr: false }
)

export const PostListItem: FC<PostListItemProps> = ({ post }) => {
  const { t } = useTranslation()
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
      <Paper className="__d-w-full" sx={{ p: 2 }}>
        <Box className="__d-flex">
          <Box className="__d-flex __d-flex-col __d-justify-center __d-grow">
            <Typography>{post.title}</Typography>

            <PostListItemTime createdAt={post.createdAt} />
          </Box>

          {isAdminOrAbove && (
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

        <Box className="__d-flex __d-justify-end">
          <PostListItemCategoryList categories={post.categories} />
        </Box>
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
