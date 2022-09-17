import Box from '@mui/material/Box'

import { PostListItem } from '@/components/album/PostListItem/PostListItem'
import { PostListItemSkeleton } from '@/components/album/PostListItemSkeleton/PostListItemSkeleton'
import { usePosts } from '@/hooks/useHttpAlbum'
import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'

export const PostList = () => {
  const { isReady, postPageQueryParams } = usePostPageQueryParams()
  const { isLoading, posts } = usePosts({
    isReady,
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
                mt: index > 0 ? 4 : 0,
                mb: posts.length - 1 === index ? 4 : 0
              }}
            >
              <PostListItem post={post} />
            </Box>
          ))}
      </Box>
    </Box>
  )
}
