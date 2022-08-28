import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'

import { POST_MAX_WIDTH, POST_PAGE_SIZE } from '@/constants/album'
import { usePostsData } from '@/hooks/useHttpAlbum'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'

const PostPagination = () => {
  const { isReady, postPageQueryParams, patch } = usePostPageQueryParams()
  const { total } = usePostsData({
    isReady,
    qpPage: postPageQueryParams.qpPage,
    qpCategoryId: postPageQueryParams.qpCategoryId
  })

  // @ts-expect-error // don't need a type for the first parameter
  const handleChange = (_, value: number) => {
    patch({ qpPage: value })
  }

  return (
    <Box className="__d-flex-center __d-flex-col">
      <Box
        className="__d-h-full"
        sx={{
          width: '90%',
          maxWidth: POST_MAX_WIDTH
        }}
      >
        <Pagination
          className="__d-flex-center"
          showFirstButton
          showLastButton
          count={isReady ? Math.ceil(total / POST_PAGE_SIZE) : 0}
          page={isReady ? postPageQueryParams.qpPage : -1}
          onChange={handleChange}
        />
      </Box>
    </Box>
  )
}

export default PostPagination
