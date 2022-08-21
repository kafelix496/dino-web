import type { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { ReactElement } from 'react'
import { useDispatch } from 'react-redux'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

import NewProjectButton from '@/components/project/NewProjectButton/NewProjectButton'
import ProjectList from '@/components/project/ProjectList/ProjectList'
import { Apps, Locales } from '@/constants/app'
import projectHttpService from '@/http-services/project'
import BaseLayout from '@/layout/BaseLayout'
import RootLayout from '@/layout/RootLayout'
import MoneyTrackerDrawer from '@/layout/SidebarNavDrawer/MoneyTrackerDrawer/MoneyTrackerDrawer'
import type { NextPageWithLayout } from '@/pages/_app'
import { setProjects } from '@/redux-actions'

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const appAbbreviation = router.query.appAbbreviation as Apps

  useEffect(() => {
    projectHttpService.getProjects({ appAbbreviation }).then((projects) => {
      dispatch(setProjects(projects))
    })
  }, [appAbbreviation, dispatch])

  return (
    <Container className="__d-h-full">
      <Box className="__d-flex-center __d-full">
        <Box
          className="__d-flex __d-flex-col"
          sx={{ width: '90%', height: '60%' }}
        >
          <Box className="__d-flex __d-justify-end" sx={{ mb: 2 }}>
            <NewProjectButton
              appAbbreviation={appAbbreviation}
            ></NewProjectButton>
          </Box>
          <Paper
            className="__d-grow"
            elevation={4}
            sx={{ overflowY: 'auto', p: 1 }}
          >
            <ProjectList appAbbreviation={appAbbreviation} />
          </Paper>
        </Box>
      </Box>
    </Container>
  )
}

Page.getLayout = (page: ReactElement) => {
  return (
    <RootLayout>
      <BaseLayout DrawerContent={MoneyTrackerDrawer}>{page}</BaseLayout>
    </RootLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.values(Locales).flatMap((locale) =>
    [Apps.moneyTracker].map((appAbbreviation) => ({
      params: { appAbbreviation },
      locale
    }))
  )
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await serverSideTranslations(locale ?? 'default', [
    'common'
  ])

  return { props: { ...translation } }
}

export default Page
