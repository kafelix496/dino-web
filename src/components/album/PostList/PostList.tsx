import type { Theme } from '@mui/material'
import Box from '@mui/material/Box'

import PostListItem from '@/components/album/PostListItem/PostListItem'
import PostListItemSkeleton from '@/components/album/PostListItemSkeleton/PostListItemSkeleton'
import { usePostsData } from '@/hooks/useHttpAlbum'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'

const PostList = () => {
  const { postPageQueryParams } = usePostPageQueryParams()
  const { isLoading, posts } = usePostsData({
    qpPage: postPageQueryParams.qpPage,
    qpCategoryId: postPageQueryParams.qpCategoryId
  })

  return (
    <Box className="__d-flex-center __d-flex-col">
      <Box className="__d-w-full __d-h-full __d-flex-center __d-flex-col">
        {isLoading && <PostListItemSkeleton />}

        {!isLoading &&
          posts.map((post, index) => (
            <Box
              key={post._id}
              className="__d-w-full __d-flex-center"
              sx={{
                marginTop: (theme: Theme) =>
                  index > 0 ? theme.spacing(4) : '',
                marginBottom: (theme: Theme) =>
                  posts.length - 1 === index ? theme.spacing(4) : ''
              }}
            >
              <PostListItem post={post} />
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default PostList
