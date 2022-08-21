import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { ReactElement } from 'react'

import Error from '@/components/Error/Error'
import ErrorLayout from '@/layout/ErrorLayout'
import RootLayout from '@/layout/RootLayout'
import type { NextPageWithLayout } from '@/pages/_app'

const Page: NextPageWithLayout = () => {
  return <Error statusCode={500} />
}

Page.getLayout = (page: ReactElement) => {
  return (
    <RootLayout>
      <ErrorLayout>{page}</ErrorLayout>
    </RootLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await serverSideTranslations(locale ?? 'default', [
    'common'
  ])

  return { props: { ...translation } }
}

export default Page
