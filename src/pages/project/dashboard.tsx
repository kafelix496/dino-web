import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import DinoNewProjectButton from '@/components/project/NewProjectButton/NewProjectButton'
import { Apps } from '@/constants'
import type { ProjectType } from '@/types'
import { convertTime, isValidAppType } from '@/utils'

const DinoProjectItem = dynamic(
  () => import('@/components/project/ProjectItem/ProjectItem'),
  { ssr: false }
)

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
          <DinoNewProjectButton
            appType={appType as string}
          ></DinoNewProjectButton>
        </Box>
        <Paper
          className="__d-grow"
          elevation={4}
          sx={{ overflowY: 'auto', p: 1 }}
        >
          <Grid container spacing={1}>
            {(data?.projects ?? []).map((project) => (
              <Grid item key={project._id} xs={12} sm={6} md={4}>
                <DinoProjectItem
                  appType={appType as string}
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
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  locale
}) => {
  const session = await getSession({ req }).catch(() => null)
  if (!session) {
    return { redirect: { permanent: false, destination: '/500' } }
  }

  const { app_type } = query
  if (!isValidAppType(app_type)) {
    return { redirect: { permanent: false, destination: '/404' } }
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
