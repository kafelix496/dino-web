import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Box from '@mui/material/Box'

import UsersDataGrid from '@/components/admin/UsersDataGrid/UsersDataGrid'
import { Apps } from '@/constants'
import adminUserHttpService from '@/http-services/adminUser'
import type { User } from '@/types'
import { hasAccessAdminPage } from '@/utils'

interface PageProps {
  users: User[]
}

const Page: NextPage<PageProps> = ({ users }) => {
  return (
    <Box
      className="__d-flex __d-justify-center __d-items-center __d-h-full"
      sx={{ py: 2 }}
    >
      <Box sx={{ width: '100%', height: 700, maxHeight: '100%' }}>
        <Box className="__d-w-full __d-h-full">
          <UsersDataGrid users={users} />
        </Box>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  locale
}) => {
  try {
    const session = await getSession({ req }).catch(() => null)
    if (!hasAccessAdminPage(session)) {
      return { redirect: { permanent: false, destination: '/500' } }
    }

    const appAbbreviation = query.appAbbreviation as Apps

    const users = await adminUserHttpService.getUsers(
      { appAbbreviation },
      {
        headers: {
          Cookie: req.headers.cookie ?? ''
        }
      }
    )

    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'default', ['common'])),
        session,
        users
      }
    }
  } catch (_) {
    return { redirect: { permanent: false, destination: '/500' } }
  }
}

export default Page
