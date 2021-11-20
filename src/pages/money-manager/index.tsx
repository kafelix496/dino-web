import { getSession } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { useTranslation } from 'next-i18next'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import type { GetServerSideProps, NextPage } from 'next'

const MoneyManager: NextPage = () => {
  // const { t } = useTranslation('home')

  return (
    <Container>
      <Box>TEST</Box>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale
}) => {
  const session = await getSession({ req }).catch(() => null)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'money-manager'
      ])),
      session
    }
  }
}

export default MoneyManager
