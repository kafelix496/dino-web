import type { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { Apps } from '@/constants/app'
import { selectUser } from '@/redux-selectors'
import { hasAccessAdminPage } from '@/utils'

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
  }
  // {
  //   link: {
  //     pathname: `/app/${Apps.moneyTracker}/project/list`
  //   },
  //   name: 'APP_NAME_MONEY_TRACKER',
  //   shouldAdmin: false,
  //   needAuth: true
  // }
]

const Page: NextPage = () => {
  const { t } = useTranslation('common')
  const user = useSelector(selectUser)

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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common']))
    }
  }
}

export default Page
