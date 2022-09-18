import Pagination from '@mui/material/Pagination'

import { usePostsTotal } from '@/hooks/useHttpAlbum'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'

export const PostPagination = () => {
  const { isReady, postPageQueryParams, patch } = usePostPageQueryParams()
  const { isLoading, totalPage } = usePostsTotal({
    isReady,
    qpCategoryId: postPageQueryParams.qpCategoryId
  })

  // @ts-expect-error // don't need a type for the first parameter
  const handleChange = (_, value: number) => {
    patch({ qpPage: value })
  }

  return (
    <Pagination
      showFirstButton
      showLastButton
      count={isReady && !isLoading ? totalPage : 0}
      page={isReady ? postPageQueryParams.qpPage : 0}
      onChange={handleChange}
    />
  )
}
