import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { getSession, useSession } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import { Apps } from '@/global-types'

const appList = [
  {
    link: {
      pathname: '/project/dashboard',
      query: { app_type: Apps.moneyTracker }
    },
    name: 'HOME_PAGE_MONEY_TRACKER_APP',
    needAuth: true
  }
]

const Page: NextPage = () => {
  const { t } = useTranslation('common')
  const [session] = useSession()

  return (
    <Container>
      <Typography variant="h3">{t('HOME_PAGE_TITLE')}</Typography>
      <Typography variant="h6">{t('HOME_PAGE_DESCRIPTION')}</Typography>

      <Box sx={{ mt: 2 }}>
        {appList.map((app, index) =>
          app.needAuth && !session ? (
            <Button key={index} variant="contained" disabled>
              {t(app.name)}
            </Button>
          ) : (
            <Link key={index} href={app.link}>
              <Button variant="contained">{t(app.name)}</Button>
            </Link>
          )
        )}
      </Box>
    </Container>
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
