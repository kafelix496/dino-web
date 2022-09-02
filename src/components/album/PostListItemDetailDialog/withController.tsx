import type { ComponentType } from 'react'

import type { PostListItemDetailDialogProps } from './PostListItemDetailDialog'
import { useAssetDialog } from './useAssetDialog'

const withController = <T extends PostListItemDetailDialogProps>(
  WrappedComponent: ComponentType<T>
) => {
  const ComponentWithController = (
    props: Omit<T, 'asset' | 'closeDialog' | 'handleClose'>
  ) => {
    const { refinedAsset, handleClose, isDialogOpen } = useAssetDialog()

    if (!isDialogOpen || !refinedAsset) {
      return <></>
    }

    return (
      <WrappedComponent
        {...(props as T)}
        asset={refinedAsset}
        closeDialog={handleClose}
        handleClose={handleClose}
      />
    )
  }

  return ComponentWithController
}

export default withController
