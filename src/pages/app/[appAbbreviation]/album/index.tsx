import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { Store } from 'redux'

import Box from '@mui/material/Box'

import AddPostButton from '@/components/album/AddPostButton/AddPostButton'
import PostList from '@/components/album/PostList/PostList'
import { Apps } from '@/constants'
import { PostAudiences } from '@/constants/album'
import albumHttpService from '@/http-services/album'
import { setCategories, setPostData } from '@/redux-actions'
import { wrapper } from '@/redux-store'
import type { RootState } from '@/redux-types'

const Page: NextPage = () => {
  return (
    <Box
      className="__d-flex __d-justify-center __d-items-start __d-h-full"
      sx={{ py: 5, overflow: 'auto' }}
    >
      <Box className="__d-w-full __d-h-full">
        <AddPostButton />

        <PostList />
      </Box>
    </Box>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (store: Store<RootState, any>): GetServerSideProps =>
    async ({ query, req, locale }) => {
      try {
        const { appAbbreviation, categoryId } = query as unknown as {
          appAbbreviation: Apps
          audience: PostAudiences
          categoryId?: string
        }
        if (appAbbreviation !== Apps.familyAlbum) {
          return { redirect: { permanent: false, destination: '/404' } }
        }

        const categories = await albumHttpService.getCategories({
          headers: { Cookie: req.headers.cookie ?? '' }
        })
        store.dispatch(setCategories(categories))
        const postData = await albumHttpService.getPosts(
          { page: 1, category: categoryId },
          {
            headers: { Cookie: req.headers.cookie ?? '' }
          }
        )
        store.dispatch(setPostData(postData.total, postData.posts))

        return {
          props: {
            ...(await serverSideTranslations(locale ?? 'default', ['common']))
          }
        }
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errrorStatus = (error as Record<string, any>)?.response?.status
        if (
          errrorStatus === 400 ||
          errrorStatus === 401 ||
          errrorStatus === 404
        ) {
          return {
            redirect: { permanent: false, destination: `/${errrorStatus}` }
          }
        }

        return { redirect: { permanent: false, destination: '/400' } }
      }
    }
)

export default Page
