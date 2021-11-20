import Link from 'next/link'
import { getSession } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import type { GetServerSideProps, NextPage } from 'next'

const Home: NextPage = () => {
  const { t } = useTranslation('home')

  return (
    <Container>
      <Typography variant="h3">{t('PAGE_TITLE')}</Typography>
      <Typography variant="h6">{t('PAGE_DESCRIPTION')}</Typography>

      <Box sx={{ mt: 2 }}>
        <Link href="/todo">
          <Button variant="contained">{t('TODO_APP')}</Button>
        </Link>
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
