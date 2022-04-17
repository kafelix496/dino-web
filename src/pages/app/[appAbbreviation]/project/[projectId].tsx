import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Page: NextPage = () => {
  return <>project</>
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale
}) => {
  try {
    const projectId = query.projectId
    if (!projectId) {
      return { redirect: { permanent: false, destination: '/404' } }
    }

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'default', ['common']))
      }
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errrorStatus = (error as Record<string, any>)?.response?.status
    if (errrorStatus === 401 || errrorStatus === 404) {
      return {
        redirect: { permanent: false, destination: `/${errrorStatus}` }
      }
    }

    return { redirect: { permanent: false, destination: '/400' } }
  }
}

export default Page
