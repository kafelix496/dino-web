import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import Button from '@mui/material/Button'

import Dialog from '@/components/Dialog/Dialog'
import PostAsset from '@/components/album/PostAsset/PostAsset'
import { PostAssetTargets } from '@/constants/album'
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
  const router = useRouter()
  const { t } = useTranslation('common')

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
              router.replace(
                {
                  query: {
                    ...router.query,
                    assetId: asset.siblings[currentIndex - 1]
                  }
                },
                undefined,
                { shallow: true }
              )
            }}
          >
            {t('BUTTON_PREV')}
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={currentIndex === asset.siblings.length - 1}
            onClick={() => {
              router.replace(
                {
                  query: {
                    ...router.query,
                    assetId: asset.siblings[currentIndex + 1]
                  }
                },
                undefined,
                { shallow: true }
              )
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
