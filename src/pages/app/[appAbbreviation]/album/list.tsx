import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Box from '@mui/material/Box'

import AssetList from '@/components/album/AssetList/AssetList'
import { Apps } from '@/constants'

const Page: NextPage = () => {
  return (
    <Box
      className="__d-flex __d-justify-center __d-items-center __d-h-full"
      sx={{ py: 2 }}
    >
      <Box sx={{ width: '100%', height: 700, maxHeight: '100%' }}>
        <Box className="__d-w-full __d-h-full">
          <AssetList assets={[]} />
        </Box>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  locale
}) => {
  try {
    const appAbbreviation = query.appAbbreviation as Apps
    if (appAbbreviation !== Apps.familyAlbum) {
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
    if (errrorStatus === 400 || errrorStatus === 401 || errrorStatus === 404) {
      return { redirect: { permanent: false, destination: `/${errrorStatus}` } }
    }

    return { redirect: { permanent: false, destination: '/400' } }
  }
}

export default Page
