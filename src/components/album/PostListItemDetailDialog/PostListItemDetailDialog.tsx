import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import Button from '@mui/material/Button'

import Dialog from '@/components/Dialog/Dialog'
import PostAsset from '@/components/album/PostAsset/PostAsset'
import { PostAssetTargets } from '@/constants/album'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'
import type { Asset } from '@/types/album'

export interface PostListItemDetailDialogProps {
  title: string
  asset: Asset
  closeDialog: () => void
  handleClose: () => void
}

const PostListItemDetailDialog: FC<PostListItemDetailDialogProps> = ({
  title,
  asset,
  closeDialog,
  handleClose
}) => {
  const { t } = useTranslation('common')
  const { patch } = usePostPageQueryParams()

  const currentIndex = asset.siblings.findIndex(
    (sibling) => sibling === asset._id
  )

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      title={title}
      fullScreen={true}
      contentJsx={
        <PostAsset
          target={PostAssetTargets.DETAIL}
          withAddIcon={false}
          asset={asset}
        />
      }
      actionsJsx={
        <>
          <Button color="secondary" variant="outlined" onClick={closeDialog}>
            {t('BUTTON_CANCEL')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={currentIndex === 0}
            onClick={() => {
              patch({ qpAssetId: asset.siblings[currentIndex - 1] })
            }}
          >
            {t('BUTTON_PREV')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={currentIndex === asset.siblings.length - 1}
            onClick={() => {
              patch({ qpAssetId: asset.siblings[currentIndex + 1] })
            }}
          >
            {t('BUTTON_NEXT')}
          </Button>
        </>
      }
    />
  )
}

export default PostListItemDetailDialog
