import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import UserList from '@/components/admin/UserList/UserList'
import { Apps, Locales } from '@/constants/app'
import adminUserHttpService from '@/http-services/adminUser'
import type { User } from '@/types'

interface PageProps {
  users: User[]
}

const Page: NextPage<PageProps> = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    adminUserHttpService
      .getUsers({ appAbbreviation: Apps.familyAlbum })
      .then((_users) => {
        setUsers(_users)
      })
  }, [])

  return (
    <Container className="__d-h-full">
      <Box
        className="__d-flex __d-justify-center __d-items-center __d-h-full"
        sx={{ py: 2 }}
      >
        <Box sx={{ width: '100%', height: 700, maxHeight: '100%' }}>
          <Box className="__d-w-full __d-h-full">
            <UserList users={users} />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { appAbbreviation: Apps.familyAlbum }, locale: Locales.EN },
      { params: { appAbbreviation: Apps.familyAlbum }, locale: Locales.KR },
      { params: { appAbbreviation: Apps.moneyTracker }, locale: Locales.EN },
      { params: { appAbbreviation: Apps.moneyTracker }, locale: Locales.KR }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common']))
    }
  }
}

// export const getServerSideProps: GetServerSideProps = async ({
//   query,
//   req,
//   locale
// }) => {
//   try {
//     const appAbbreviation = query.appAbbreviation as Apps
//     const users = await adminUserHttpService.getUsers(
//       { appAbbreviation },
//       {
//         headers: { Cookie: req.headers.cookie ?? '' }
//       }
//     )

//     return {
//       props: {
//         ...(await serverSideTranslations(locale ?? 'default', ['common'])),
//         users
//       }
//     }
//   } catch (error) {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const errrorStatus = (error as Record<string, any>)?.response?.status
//     if (errrorStatus === 400 || errrorStatus === 401 || errrorStatus === 404) {
//       return { redirect: { permanent: false, destination: `/${errrorStatus}` } }
//     }

//     return { redirect: { permanent: false, destination: '/400' } }
//   }
// }

export default Page
