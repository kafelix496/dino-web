import type { GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DinoError from '@/components/Error/Error'

const Page: NextPage = () => {
  return <DinoError statusCode={404} />
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common']))
    }
  }
}

export default Page
