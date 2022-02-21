import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { getSession, useSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { AccessLevels, Apps } from '@/constants'

const appList = [
  {
    link: {
      pathname: '/admin/users'
    },
    name: 'HOME_PAGE_ADMIN_APP',
    shouldAdmin: true,
    needAuth: true
  },
  {
    link: {
      pathname: '/project/dashboard',
      query: { app_type: Apps.moneyTracker }
    },
    name: 'HOME_PAGE_MONEY_TRACKER_APP',
    shouldAdmin: false,
    needAuth: true
  }
]

const Page: NextPage = () => {
  const { t } = useTranslation('common')
  const { data: session } = useSession()

  const canAccessAdminPage =
    (session?.user?.appsAccessLevel ?? []).find(
      (level) =>
        level === AccessLevels.SUPER_ADMIN || level === AccessLevels.ADMIN
    ) !== undefined

  return (
    <>
      <Typography variant="h3">{t('HOME_PAGE_TITLE')}</Typography>
      <Typography variant="h6">{t('HOME_PAGE_DESCRIPTION')}</Typography>

      <Box sx={{ mt: 2 }}>
        {appList.map((app) => {
          if (!canAccessAdminPage && app.shouldAdmin) {
            return null
          }

          if (app.needAuth && !session) {
            return (
              <Button
                key={app.name}
                variant="contained"
                disabled
                sx={{ mr: 1 }}
              >
                {t(app.name)}
              </Button>
            )
          }

          return (
            <Link key={app.name} href={app.link}>
              <Button variant="contained" sx={{ mr: 1 }}>
                {t(app.name)}
              </Button>
            </Link>
          )
        })}
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale
}) => {
  const session = await getSession({ req }).catch(() => null)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common'])),
      session
    }
  }
}

export default Page
