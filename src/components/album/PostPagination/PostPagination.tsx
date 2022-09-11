import Pagination from '@mui/material/Pagination'

import { POST_PAGE_SIZE } from '@/constants/album'
import { usePostsTotal } from '@/hooks/useHttpAlbum'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'

const PostPagination = () => {
  const { isReady, postPageQueryParams, patch } = usePostPageQueryParams()
  const { isLoading, total } = usePostsTotal({ isReady })

  // @ts-expect-error // don't need a type for the first parameter
  const handleChange = (_, value: number) => {
    patch({ qpPage: value })
  }

  return (
    <Pagination
      className="__d-flex-center"
      showFirstButton
      showLastButton
      count={isReady && !isLoading ? Math.ceil(total! / POST_PAGE_SIZE) : 0}
      page={isReady ? postPageQueryParams.qpPage : 0}
      onChange={handleChange}
    />
  )
}

export default PostPagination
