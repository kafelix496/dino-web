import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Container from '@mui/material/Container'

const Page: NextPage = () => {
  return <Container>dashboard</Container>
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale
}) => {
  const session = await getSession({ req }).catch(() => null)
  if (!session) {
    return { redirect: { permanent: false, destination: '/500' } }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common'])),
      session
    }
  }
}

export default Page
