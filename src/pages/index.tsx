import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import type { GetStaticProps, NextPage } from 'next'

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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'home']))
    }
  }
}

export default Home
