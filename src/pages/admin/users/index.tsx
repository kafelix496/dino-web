import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccessLevels } from '@/global-constants'

const Page: NextPage = () => {
  return <>aaa</>
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale
}) => {
  const session = await getSession({ req }).catch(() => null)
  if (
    !session ||
    (session?.user?.appsAccessLevel ?? []).find(
      (level) =>
        level === AccessLevels.SUPER_ADMIN || level === AccessLevels.ADMIN
    ) === undefined
  ) {
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
