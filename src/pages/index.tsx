import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { getSession, useSession } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

const appList = [
  {
    link: '/money-manager',
    name: 'MONEY_MANAGER_APP',
    needAuth: true
  }
]

const Home: NextPage = () => {
  const { t } = useTranslation('home')
  const [session] = useSession()

  return (
    <Container>
      <Typography variant="h3">{t('PAGE_TITLE')}</Typography>
      <Typography variant="h6">{t('PAGE_DESCRIPTION')}</Typography>

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
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'home'
      ])),
      session
    }
  }
}

export default Home
