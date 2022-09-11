import { useCallback } from 'react'
import type { ComponentType } from 'react'

import { POST_PAGE_SIZE } from '@/constants/album'
import { usePostsTotal } from '@/hooks/useHttpAlbum'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'

import type { PostPageMoveButtonsProps } from './PostPageMoveButtons'

const withController = <T extends PostPageMoveButtonsProps>(
  WrappedComponent: ComponentType<T>
) => {
  const ComponentWithController = (props: Pick<T, never>) => {
    const { isReady, postPageQueryParams, patch } = usePostPageQueryParams()
    const { isLoading, total } = usePostsTotal({ isReady })

    const totalPage = Math.ceil(total! / POST_PAGE_SIZE)

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
