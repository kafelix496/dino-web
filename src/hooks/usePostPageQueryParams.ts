import { useRouter } from 'next/router'
import { compose, isNil, mergeLeft, omit } from 'ramda'
import { useCallback, useMemo } from 'react'

import type {
  PostQueryParamRequest,
  PostQueryParamResponse
} from '@/types/album'
import { isPositiveStringNumber } from '@/utils/app'

export const usePostPageQueryParams = (): {
  postPageQueryParams: PostQueryParamResponse
  patch: (newQueryParams: PostQueryParamRequest) => void
} => {
  const router = useRouter()
  const { page, category, asset } = router.query

  const postPageQueryParams = useMemo(
    () => ({
      page: isPositiveStringNumber(page) ? +page! : 1,
      category: typeof category === 'string' ? category : undefined,
      asset: typeof asset === 'string' ? asset : undefined
    }),
    [page, category, asset]
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
              ...(!isNil(newQueryParams.category)
                ? { category: newQueryParams.category }
                : {}),
              ...(!isNil(newQueryParams.asset)
                ? { asset: newQueryParams.asset }
                : {})
            }),
            omit(
              new Array<'category' | 'asset'>()
                .concat(newQueryParams.category === null ? ['category'] : [])
                .concat(newQueryParams.asset === null ? ['asset'] : [])
            )
          )(router.query)
        },
        undefined,
        { shallow: true }
      )
    },
    [router]
  )

  return { postPageQueryParams, patch }
}
