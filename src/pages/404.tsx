import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CustomError from '@/components/Error/Error'

const Custom404 = () => {
  return <CustomError statusCode={404} />
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common']))
    }
  }
}

export default Custom404
