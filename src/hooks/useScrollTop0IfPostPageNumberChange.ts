import { useEffect } from 'react'
import type { RefObject } from 'react'

import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'

export const useScrollTop0IfPostPageNumberChange = (
  htmlElementRef: RefObject<HTMLElement>
) => {
  const { isReady, postPageQueryParams } = usePostPageQueryParams()

  useEffect(() => {
    if (isReady && htmlElementRef.current) {
      htmlElementRef.current.scrollTop = 0
    }
  }, [htmlElementRef, isReady, postPageQueryParams.qpPage])
}
