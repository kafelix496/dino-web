import { useCallback } from 'react'
import type { ComponentType } from 'react'

import { usePostsTotal } from '@/hooks/useHttpAlbum'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'

import type { PostPageMoveButtonsProps } from './PostPageMoveButtons'

const withController = <T extends PostPageMoveButtonsProps>(
  WrappedComponent: ComponentType<T>
) => {
  const ComponentWithController = (props: Pick<T, never>) => {
    const { isReady, postPageQueryParams, patch } = usePostPageQueryParams()
    const { isLoading, totalPage } = usePostsTotal({ isReady })

    const goPrevPage = useCallback(() => {
      patch({ qpPage: postPageQueryParams.qpPage - 1 })
    }, [patch, postPageQueryParams])
    const goNextPage = useCallback(() => {
      patch({ qpPage: postPageQueryParams.qpPage + 1 })
    }, [patch, postPageQueryParams])

    return (
      <WrappedComponent
        {...(props as T)}
        isLoading={isLoading}
        currentPage={postPageQueryParams.qpPage}
        totalPage={totalPage}
        goPrevPage={goPrevPage}
        goNextPage={goNextPage}
      />
    )
  }

  return ComponentWithController
}

export default withController
