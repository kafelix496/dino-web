import type { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import type { Store } from 'redux'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import NewProjectButton from '@/components/project/NewProjectButton/NewProjectButton'
import { Apps } from '@/constants'
import projectHttpService from '@/http-services/project'
import { setProjects } from '@/redux-actions'
import { selectProjectList } from '@/redux-selectors'
import { wrapper } from '@/redux-store'
import type { RootState } from '@/redux-types'
import { convertTime } from '@/utils'

const ProjectItem = dynamic(
  () => import('@/components/project/ProjectItem/ProjectItem'),
  { ssr: false }
)

const Page: NextPage = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const projects = useSelector(selectProjectList)
  const appAbbreviation = router.query.appAbbreviation as Apps

  const getCreatedAtTxt = (dbTime: string): string =>
    `${t('CREATED_AT')}: ${convertTime.dbToJs(dbTime)}`
  const getUpdatedAtTxt = (dbTime: string): string =>
    `${t('UPDATED_AT')}: ${convertTime.dbToJs(dbTime)}`

  return (
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
          <Grid container spacing={1}>
            {(projects ?? []).map((project) => (
              <Grid item key={project._id} xs={12} sm={6} md={4}>
                <ProjectItem
                  appAbbreviation={appAbbreviation}
                  id={project._id}
                  title={project.title}
                  subTitle={
                    <Typography variant="subtitle2" color="text.secondary">
                      {getCreatedAtTxt(project.createdAt)}
                    </Typography>
                  }
                  tooltip={
                    <>
                      <Typography variant="subtitle2" color="inherit">
                        {getCreatedAtTxt(project.createdAt)}
                      </Typography>
                      <Typography variant="subtitle2" color="inherit">
                        {getUpdatedAtTxt(project.updatedAt)}
                      </Typography>
                      {project.description ? (
                        <Typography variant="subtitle2" color="inherit">
                          {`${t('PROJECT_DESCRIPTION')}: ${
                            project.description
                          }`}
                        </Typography>
                      ) : null}
                    </>
                  }
                  description={project.description}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
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
        if (errrorStatus === 401 || errrorStatus === 404) {
          return {
            redirect: { permanent: false, destination: `/${errrorStatus}` }
          }
        }

        return { redirect: { permanent: false, destination: '/400' } }
      }
    }
)

export default Page
