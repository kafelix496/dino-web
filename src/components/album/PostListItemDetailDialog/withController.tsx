import { useRouter } from 'next/router'
import type { ComponentType } from 'react'
import { useCallback } from 'react'
import { useEffect, useState } from 'react'

import { useDialogStatus } from '@/hooks/useDialogStatus'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import albumHttpService from '@/http-services/album'
import type { Asset } from '@/types/album'
import { getAssetUrl } from '@/utils/album'

import type { PostListItemDetailDialogProps } from './PostListItemDetailDialog'

const withController = <T extends PostListItemDetailDialogProps>(
  WrappedComponent: ComponentType<T>
) => {
  const ComponentWithController = (
    props: Omit<T, 'asset' | 'closeDialog' | 'handleClose'>
  ) => {
    const [assetWithSrc, setAssetWithSrc] = useState<Asset | null>(null)
    const router = useRouter()
    const { state, openDialog, closeDialog } = useDialogStatus()
    const { postPageQueryParams, patch } = usePostPageQueryParams()

    const handleClose = useCallback(() => {
      patch({ qpAssetId: null })

      setAssetWithSrc(null)
      closeDialog()
    }, [patch, setAssetWithSrc, closeDialog])

    useEffect(() => {
      if (postPageQueryParams.qpAssetId) {
        openDialog()
      }
    }, [postPageQueryParams.qpAssetId, router, openDialog])

    useUpdateEffect(() => {
      if (postPageQueryParams.qpAssetId) {
        albumHttpService
          .getAsset({ id: postPageQueryParams.qpAssetId as string })
          .then((asset) =>
            getAssetUrl({ key: asset.key, extension: asset.extension }).then(
              (src) => ({
                ...asset,
                src
              })
            )
          )
          .then((asset) => {
            setAssetWithSrc(asset)
          })
          .catch(() => {
            handleClose()
          })
      }
    }, [postPageQueryParams.qpAssetId, openDialog, handleClose])

    if (!state.isOpen || !assetWithSrc) {
      return <></>
    }

    return (
      <WrappedComponent
        {...(props as T)}
        asset={assetWithSrc}
        closeDialog={handleClose}
        handleClose={handleClose}
      />
    )
  }

  return ComponentWithController
}

export default withController
