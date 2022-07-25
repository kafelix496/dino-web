import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import type { Store } from 'redux'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

import NewProjectButton from '@/components/project/NewProjectButton/NewProjectButton'
import ProjectList from '@/components/project/ProjectList/ProjectList'
import { Apps } from '@/constants/app'
import projectHttpService from '@/http-services/project'
import { setProjects } from '@/redux-actions'
import { wrapper } from '@/redux-store'
import type { RootState } from '@/redux-types'

const Page: NextPage = () => {
  const router = useRouter()
  const appAbbreviation = router.query.appAbbreviation as Apps

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

export const getServerSideProps = wrapper.getServerSideProps(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (store: Store<RootState, any>): GetServerSideProps =>
    async ({ query, req, locale }) => {
      try {
        const appAbbreviation = query.appAbbreviation as Apps
        if (appAbbreviation !== Apps.moneyTracker) {
          return { redirect: { permanent: false, destination: '/404' } }
        }

        const projects = await projectHttpService.getProjects(
          { appAbbreviation },
          {
            headers: { Cookie: req.headers.cookie ?? '' }
          }
        )
        store.dispatch(setProjects(projects))

        return {
          props: {
            ...(await serverSideTranslations(locale ?? 'default', ['common']))
          }
        }
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errrorStatus = (error as Record<string, any>)?.response?.status
        if (
          errrorStatus === 400 ||
          errrorStatus === 401 ||
          errrorStatus === 404
        ) {
          return {
            redirect: { permanent: false, destination: `/${errrorStatus}` }
          }
        }

        return { redirect: { permanent: false, destination: '/400' } }
      }
    }
)

export default Page
