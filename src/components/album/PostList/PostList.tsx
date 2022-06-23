import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'

import PostListItem from '@/components/album/PostListItem/PostListItem'
import { selectPostData } from '@/redux-selectors'

const PostList = () => {
  const postData = useSelector(selectPostData)

  return (
    <Box className="__d-flex-center __d-flex-col">
      <Box className="__d-h-full" sx={{ pb: 5 }}>
        {postData.posts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </Box>
    </Box>
  )
}

export default PostList
