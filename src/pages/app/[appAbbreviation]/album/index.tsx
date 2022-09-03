import type { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { compose } from 'ramda'
import { useRef } from 'react'
import type { ReactElement } from 'react'

import type { Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import AddPostButton from '@/components/album/AddPostButton/AddPostButton'
import PostList from '@/components/album/PostList/PostList'
import PostListItemDetailDialog from '@/components/album/PostListItemDetailDialog/PostListItemDetailDialog'
import withController from '@/components/album/PostListItemDetailDialog/withController'
import PostPagination from '@/components/album/PostPagination/PostPagination'
import { Apps, Locales } from '@/constants/app'
import { useRedirect404IfNotSignedIn } from '@/hooks/useRedirect404IfNotSignedIn'
import { useScrollTop0IfPostPageNumberChange } from '@/hooks/useScrollTop0IfPostPageNumberChange'
import BaseLayout from '@/layout/BaseLayout'
import RootLayout from '@/layout/RootLayout'
import FamilyAlbumDrawer from '@/layout/SidebarNavDrawer/FamilyAlbumDrawer/FamilyAlbumDrawer'
import type { NextPageWithLayout } from '@/pages/_app'

const PostListItemDetailDialogWithController = compose(withController)(
  PostListItemDetailDialog
)

const Page: NextPageWithLayout = () => {
  const scrollBoxRef = useRef<HTMLElement>(null)

  useScrollTop0IfPostPageNumberChange(scrollBoxRef)
  useRedirect404IfNotSignedIn()

  return (
    <Box
      className="__d-flex __d-flex-col __d-w-full __d-h-full __d-overflow-auto"
      ref={scrollBoxRef}
    >
      <Paper
        elevation={0}
        className="__d-w-full __d-sticky"
        sx={{ top: 0, zIndex: (theme: Theme) => theme.zIndex.appBar }}
      >
        <Box sx={{ mt: 5 }} />

        <Box sx={{ mt: 2 }}>
          <AddPostButton />
        </Box>

        <Box sx={{ mt: 2 }}>
          <PostPagination />
        </Box>

        <Box sx={{ mt: 5 }} />
      </Paper>

      <Box className="__d-w-full __d-h-full">
        <PostList />

        <Box sx={{ mt: 5 }} />
      </Box>

      <PostListItemDetailDialogWithController title="" />
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
