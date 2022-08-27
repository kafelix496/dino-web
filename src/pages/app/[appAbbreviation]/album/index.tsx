import type { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { compose } from 'ramda'
import type { ReactElement } from 'react'

import Box from '@mui/material/Box'

import AddPostButton from '@/components/album/AddPostButton/AddPostButton'
import PostList from '@/components/album/PostList/PostList'
import PostListItemDetailDialog from '@/components/album/PostListItemDetailDialog/PostListItemDetailDialog'
import withController from '@/components/album/PostListItemDetailDialog/withController'
import { Apps, Locales } from '@/constants/app'
import BaseLayout from '@/layout/BaseLayout'
import RootLayout from '@/layout/RootLayout'
import FamilyAlbumDrawer from '@/layout/SidebarNavDrawer/FamilyAlbumDrawer/FamilyAlbumDrawer'
import type { NextPageWithLayout } from '@/pages/_app'

const PostListItemDetailDialogWithController = compose(withController)(
  PostListItemDetailDialog
)

const Page: NextPageWithLayout = () => {
  return (
    <Box
      className="__d-flex __d-justify-center __d-items-start __d-h-full"
      sx={{ pt: 5, overflow: 'auto' }}
    >
      <Box className="__d-w-full __d-h-full">
        <AddPostButton />

        <PostList />

        <PostListItemDetailDialogWithController title="" />
      </Box>
    </Box>
  )
}

Page.getLayout = (page: ReactElement) => {
  return (
    <RootLayout>
      <BaseLayout DrawerContent={FamilyAlbumDrawer}>{page}</BaseLayout>
    </RootLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.values(Locales).flatMap((locale) =>
    [Apps.familyAlbum].map((appAbbreviation) => ({
      params: { appAbbreviation },
      locale
    }))
  )
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await serverSideTranslations(locale ?? 'default', [
    'common'
  ])

  return { props: { ...translation } }
}

export default Page
