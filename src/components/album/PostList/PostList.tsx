import { useRouter } from 'next/router'

import Box from '@mui/material/Box'

import PostListItem from '@/components/album/PostListItem/PostListItem'
import PostListItemSkeleton from '@/components/album/PostListItemSkeleton/PostListItemSkeleton'
import { usePostsData } from '@/hooks/useHttpAlbum'

const PostList = () => {
  const router = useRouter()
  const { page, category } = router.query
  const { isLoading, posts } = usePostsData({
    page: (typeof page === 'string' ? +page : 1) || 1,
    category: typeof category === 'string' ? category : undefined
  })

  return (
    <Box className="__d-flex-center __d-flex-col">
      <Box
        className="__d-w-full __d-h-full __d-flex-center __d-flex-col"
        sx={{ pb: 5 }}
      >
        {isLoading && <PostListItemSkeleton />}

        {!isLoading &&
          posts.map((post) => <PostListItem key={post._id} post={post} />)}
      </Box>
    </Box>
  )
}

export default PostList
