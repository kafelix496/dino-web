import Pagination from '@mui/material/Pagination'

import { usePostsTotal } from '@/hooks/useHttpAlbum'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'

const PostPagination = () => {
  const { isReady, postPageQueryParams, patch } = usePostPageQueryParams()
  const { isLoading, totalPage } = usePostsTotal({ isReady })

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

export default PostPagination
