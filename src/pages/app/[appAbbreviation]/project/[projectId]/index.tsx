import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Page: NextPage = () => {
  return <>project</>
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

  const { projectId } = query
  if (!projectId) {
    return { redirect: { permanent: false, destination: '/404' } }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common'])),
      session
    }
  }
}

export default Page
