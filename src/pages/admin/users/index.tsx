import type { GetServerSideProps, NextPage } from 'next'

import { Apps } from '@/constants'

const Page: NextPage = () => <></>

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false,
      destination: `/admin/users/${Apps.familyAlbum}`
    }
  }
}

export default Page
