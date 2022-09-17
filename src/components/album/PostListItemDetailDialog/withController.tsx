import type { ComponentType } from 'react'

import type { PostListItemDetailDialogProps } from './PostListItemDetailDialog'
import { useAssetDialog } from './useAssetDialog'

export const withController = <T extends PostListItemDetailDialogProps>(
  WrappedComponent: ComponentType<T>
) => {
  const ComponentWithController = (props: Pick<T, never>) => {
    const { refinedAsset, handleClose, isDialogOpen } = useAssetDialog()

    if (!isDialogOpen || !refinedAsset) {
      return null
    }

    return (
      <WrappedComponent
        {...(props as T)}
        title=""
        asset={refinedAsset}
        closeDialog={handleClose}
        handleClose={handleClose}
      />
    )
  }

  return ComponentWithController
}
