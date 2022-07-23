import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'

import PostListItem from '@/components/album/PostListItem/PostListItem'
import albumHttpService from '@/http-services/album'
import { setPostData } from '@/redux-actions'
import { selectPostData } from '@/redux-selectors'

const PostList = () => {
  const router = useRouter()
  const postData = useSelector(selectPostData)
  const dispatch = useDispatch()

  useEffect(() => {
    albumHttpService
      .getPosts({
        page: 1,
        category: router.query.categoryId as string | undefined
      })
      .then((postData) => {
        dispatch(setPostData(postData.total, postData.posts))
      })
  }, [router.query.categoryId, dispatch])

  return (
    <Box className="__d-flex-center __d-flex-col">
      <Box
        className="__d-w-full __d-h-full __d-flex-center __d-flex-col"
        sx={{ pb: 5 }}
      >
        {postData.posts
          .filter((post) => !post.temporaryDeleted)
          .map((post) => (
            <PostListItem key={post._id} post={post} />
          ))}
      </Box>
    </Box>
  )
}

export default PostList
