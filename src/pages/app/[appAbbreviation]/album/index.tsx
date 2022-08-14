import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import compose from 'ramda/src/compose'
import type { Store } from 'redux'

import Box from '@mui/material/Box'

import AddPostButton from '@/components/album/AddPostButton/AddPostButton'
import PostList from '@/components/album/PostList/PostList'
import PostListItemDetailDialog from '@/components/album/PostListItemDetailDialog/PostListItemDetailDialog'
import withController from '@/components/album/PostListItemDetailDialog/withController'
import { PostAudiences } from '@/constants/album'
import { Apps } from '@/constants/app'
import albumHttpService from '@/http-services/album'
import { setCategories, setPostData } from '@/redux-actions'
import { wrapper } from '@/redux-store'
import type { RootState } from '@/redux-types'
import type { Asset } from '@/types/album'
import { getAssetUrl } from '@/utils/album'

interface PageProps {
  asset?: Asset
}

const PostListItemDetailDialogWithController = compose(withController)(
  PostListItemDetailDialog
)

const Page: NextPage<PageProps> = ({ asset }) => {
  return (
    <Box
      className="__d-flex __d-justify-center __d-items-start __d-h-full"
      sx={{ pt: 5, overflow: 'auto' }}
    >
      <Box className="__d-w-full __d-h-full">
        <AddPostButton />

        <PostList />

        <PostListItemDetailDialogWithController
          title=""
          asset={asset ?? null}
        />
      </Box>
    </Box>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (store: Store<RootState, any>): GetServerSideProps =>
    async ({ query, req, locale }) => {
      try {
        const { appAbbreviation, categoryId, assetId } = query as unknown as {
          appAbbreviation: Apps
          audience: PostAudiences
          categoryId?: string
          assetId?: string
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
        let assetWithSrc = null
        if (assetId) {
          const asset = await albumHttpService.getAsset(
            { id: assetId as string },
            {
              headers: { Cookie: req.headers.cookie ?? '' }
            }
          )
          assetWithSrc = await getAssetUrl(
            {
              key: asset.key,
              extension: asset.extension
            },
            {
              headers: { Cookie: req.headers.cookie ?? '' }
            }
          ).then((src) => ({ ...asset, src }))
        }

        return {
          props: {
            ...(await serverSideTranslations(locale ?? 'default', ['common'])),
            ...(assetWithSrc ? { asset: assetWithSrc } : {})
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
