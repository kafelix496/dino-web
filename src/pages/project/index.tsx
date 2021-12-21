import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useSWR from 'swr'
import axios from 'axios'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import DinoNewProjectButton from '@/components/project/NewProjectButton/NewProjectButton'
import DinoProjectItem from '@/components/project/ProjectItem/ProjectItem'

import { isValidAppType, convertTime } from '@/utils'
import { Apps } from '@/global-types'
import type { ProjectType } from '@/global-types'

const Page: NextPage = () => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { app_type: appType } = router.query
  const { data, error } = useSWR<{ status: boolean; projects: ProjectType[] }>(
    `/api/project?app_type=${appType}`
  )

  if (error || data?.status === false) {
    router.push('/500')
  }

  return (
    <Container sx={{ height: '100%' }}>
      <Box className="__dino__all-center">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            height: '60%'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <DinoNewProjectButton
              appType={appType as string}
            ></DinoNewProjectButton>
          </Box>
          <Paper elevation={4} sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
            <Grid container spacing={1}>
              {(data?.projects ?? []).map((project) => (
                <Grid item key={project._id} xs={12} sm={6} md={4}>
                  <DinoProjectItem
                    appType={appType as string}
                    id={project._id}
                    title={project.title}
                    subTitle={
                      <Typography variant="subtitle2" color="text.secondary">
                        {t('CREATED_AT')}:{' '}
                        {convertTime.dbToJs(project.createdAt)}
                      </Typography>
                    }
                    tooltip={
                      <>
                        <Typography variant="subtitle2" color="inherit">
                          {t('CREATED_AT')}:{' '}
                          {convertTime.dbToJs(project.createdAt)}
                        </Typography>
                        <Typography variant="subtitle2" color="inherit">
                          {t('UPDATED_AT')}:{' '}
                          {convertTime.dbToJs(project.updatedAt)}
                        </Typography>
                        {project.description ? (
                          <Typography variant="subtitle2" color="inherit">
                            {t('PROJECT_DESCRIPTION')}: {project.description}
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
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  locale
}) => {
  const { app_type } = query
  if (!isValidAppType(app_type)) {
    return { redirect: { permanent: false, destination: '/404' } }
  }

  const session = await getSession({ req }).catch(() => null)
  if (!session) {
    return { redirect: { permanent: false, destination: '/500' } }
  }

  const data = await axios
    .get(`${process.env.PAGE_URL}/api/project?app_type=${Apps.moneyTracker}`, {
      headers: { Cookie: req.headers.cookie! }
    })
    .then((res) => res.data)
    .catch(() => null)
  if (!data || data?.status === false) {
    return { redirect: { permanent: false, destination: '/500' } }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common'])),
      session,
      fallback: { [`/api/project?app_type=${Apps.moneyTracker}`]: data }
    }
  }
}

export default Page
