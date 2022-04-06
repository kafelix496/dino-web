import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Box from '@mui/material/Box'

import UsersDataGrid from '@/components/admin/UsersDataGrid/UsersDataGrid'
import { hasAccessAdminPage } from '@/utils'

const Page: NextPage = () => {
  return (
    <Box
      className="__d-flex __d-justify-center __d-items-center __d-h-full"
      sx={{ py: 2 }}
    >
      <Box sx={{ width: '100%', height: 700, maxHeight: '100%' }}>
        <Box className="__d-w-full __d-h-full">
          <UsersDataGrid />
        </Box>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale
}) => {
  const session = await getSession({ req }).catch(() => null)
  if (!hasAccessAdminPage(session)) {
    return { redirect: { permanent: false, destination: '/500' } }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common'])),
      session,
      fallback: false
    }
  }
}

export default Page
