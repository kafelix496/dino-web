import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import axios from 'axios'

import Container from '@mui/material/Container'

import { Apps } from '@/global-types'

const Page: NextPage = () => {
  return <Container>dashboard</Container>
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  locale
}) => {
  const session = await getSession({ req }).catch(() => null)
  if (!session) {
    return { redirect: { permanent: false, destination: '/500' } }
  }

  const { project_id } = query
  if (!project_id) {
    return { redirect: { permanent: false, destination: '/404' } }
  }

  const data = await axios
    .get(
      `${process.env.PAGE_URL}/api/project/${project_id}?app_type=${Apps.moneyTracker}`,
      {
        headers: { Cookie: req.headers.cookie! }
      }
    )
    .then((res) => res.data)
    .catch(() => null)
  if (!data || data?.status === false) {
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
