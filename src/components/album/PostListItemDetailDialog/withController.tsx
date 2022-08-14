import { useRouter } from 'next/router'
import { omit } from 'ramda'
import type { ComponentType } from 'react'
import { useCallback } from 'react'
import { useEffect, useState } from 'react'

import { useDialogStatus } from '@/hooks/useDialogStatus'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import albumHttpService from '@/http-services/album'
import type { Asset } from '@/types/album'
import { getAssetUrl } from '@/utils/album'

import type { PostListItemDetailDialogProps } from './PostListItemDetailDialog'

const withController = <T extends PostListItemDetailDialogProps>(
  WrappedComponent: ComponentType<T>
) => {
  const ComponentWithController = (
    props: Omit<T, 'asset' | 'closeDialog' | 'handleClose'> & {
      asset: Asset | null
    }
  ) => {
    const { asset } = props

    const [assetWithSrc, setAssetWithSrc] = useState<Asset | null>(
      asset ?? null
    )
    const router = useRouter()
    const { state, openDialog, closeDialog } = useDialogStatus()

    const { assetId } = router.query

    const handleClose = useCallback(() => {
      router.replace(
        {
          query: { ...omit(['assetId'], router.query) }
        },
        undefined,
        { shallow: true }
      )

      setAssetWithSrc(null)
      closeDialog()
    }, [router, setAssetWithSrc, closeDialog])

    useEffect(() => {
      if (assetId) {
        openDialog()
      }
    }, [assetId, router, openDialog])

    useUpdateEffect(() => {
      if (assetId) {
        albumHttpService
          .getAsset({ id: assetId as string })
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
    }, [assetId, openDialog, handleClose])

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
