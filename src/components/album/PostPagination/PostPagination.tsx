import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'

import { POST_MAX_WIDTH, POST_PAGE_SIZE } from '@/constants/album'
import { usePostsData } from '@/hooks/useHttpAlbum'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'

const PostPagination = () => {
  const { postPageQueryParams, patch } = usePostPageQueryParams()
  const { total } = usePostsData({
    qpPage: postPageQueryParams.qpPage,
    qpCategoryId: postPageQueryParams.qpCategoryId
  })

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
          count={Math.ceil(total / POST_PAGE_SIZE)}
          page={postPageQueryParams.qpPage}
          onChange={handleChange}
        />
      </Box>
    </Box>
  )
}

export default PostPagination
