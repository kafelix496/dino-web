import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import type { ReactElement } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { Apps } from '@/constants/app'
import { useCurrentUser } from '@/hooks/useHttpApp'
import BaseLayout from '@/layout/BaseLayout'
import RootLayout from '@/layout/RootLayout'
import type { NextPageWithLayout } from '@/pages/_app'
import { hasAccessAdminPage } from '@/utils/app'

const appList = [
  {
    link: {
      // default to admin family album users
      pathname: `/app/${Apps.familyAlbum}/admin/user/list`
    },
    name: 'APP_NAME_ADMIN',
    shouldAdmin: true,
    needAuth: true
  },
  {
    link: {
      pathname: `/app/${Apps.familyAlbum}/album`
    },
    name: 'APP_NAME_FAMILY_ALBUM',
    shouldAdmin: false,
    needAuth: true
  },
  {
    link: {
      pathname: `/app/${Apps.moneyTracker}/doc/fixed-income`
    },
    name: 'APP_NAME_MONEY_TRACKER',
    shouldAdmin: false,
    needAuth: true
  }
]

const Page: NextPageWithLayout = () => {
  const { t } = useTranslation('common')
  const { user } = useCurrentUser()

  const canAccessAdminPage = hasAccessAdminPage(user)

  return (
    <Container>
      <Typography variant="h3">{t('HOME_PAGE_TITLE')}</Typography>
      <Typography variant="h6">{t('HOME_PAGE_DESCRIPTION')}</Typography>

      <Box sx={{ mt: 2 }}>
        {appList.map((app) => {
          if (!canAccessAdminPage && app.shouldAdmin) {
            return null
          }

          if (app.needAuth && !user) {
            return (
              <Button
                key={app.name}
                variant="contained"
                disabled
                sx={{ mt: 1, ml: 1 }}
              >
                {t(app.name)}
              </Button>
            )
          }

          return (
            <Link key={app.name} href={app.link}>
              <Button variant="contained" sx={{ mt: 1, ml: 1 }}>
                {t(app.name)}
              </Button>
            </Link>
          )
        })}
      </Box>
    </Container>
  )
}

Page.getLayout = (page: ReactElement) => {
  return (
    <RootLayout>
      <BaseLayout>{page}</BaseLayout>
    </RootLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common']))
    }
  }
}

export default Page
