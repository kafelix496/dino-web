import { useRouter } from 'next/router'
import { compose, isNil, mergeLeft, omit } from 'ramda'
import { useCallback, useMemo } from 'react'

import type {
  PostQueryParamRequest,
  PostQueryParamResponse
} from '@/types/album'
import { isPositiveStringNumber } from '@/utils/app'

export const usePostPageQueryParams = (): {
  isReady: boolean
  postPageQueryParams: PostQueryParamResponse
  patch: (newQueryParams: PostQueryParamRequest) => void
} => {
  const router = useRouter()
  const { page, qpCategoryId, qpAssetId } = router.query

  const postPageQueryParams = useMemo(
    () => ({
      page: isPositiveStringNumber(page) ? +page! : 1,
      qpCategoryId: typeof qpCategoryId === 'string' ? qpCategoryId : undefined,
      qpAssetId: typeof qpAssetId === 'string' ? qpAssetId : undefined
    }),
    [page, qpCategoryId, qpAssetId]
  )
  const patch = useCallback(
    (newQueryParams: PostQueryParamRequest) => {
      router.replace(
        {
          query: compose(
            mergeLeft({
              ...(isPositiveStringNumber(String(newQueryParams.page))
                ? { page: String(newQueryParams.page) }
                : { page: 1 }),
              ...(!isNil(newQueryParams.qpCategoryId)
                ? { qpCategoryId: newQueryParams.qpCategoryId }
                : {}),
              ...(!isNil(newQueryParams.qpAssetId)
                ? { qpAssetId: newQueryParams.qpAssetId }
                : {})
            }),
            omit(
              new Array<'qpCategoryId' | 'qpAssetId'>()
                .concat(
                  newQueryParams.qpCategoryId === null ? ['qpCategoryId'] : []
                )
                .concat(newQueryParams.qpAssetId === null ? ['qpAssetId'] : [])
            )
          )(router.query)
        },
        undefined,
        { shallow: true }
      )
    },
    [router]
  )

  return { isReady: router.isReady, postPageQueryParams, patch }
}
