import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import useSWR from 'swr'

import NewButton from '@/components/money-manager/NewButton/NewButton'
import ProjectItem from '@/components/money-manager/ProjectItem/ProjectItem'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import type { ProjectType } from '@/global-types'

const MoneyManager: NextPage = () => {
  const { t } = useTranslation('money-manager')

  const { data, error } =
    useSWR<{ status: boolean; projects: ProjectType[] }>('/api/project')

  if (error || data?.status === false) {
    return <div>failed to load</div>
  }

  if (!data) {
    return <div>loading...</div>
  }

  return (
    <Container sx={{ height: '100%' }}>
      <Box className="__ka496-pw__all-center">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            height: '60%'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <NewButton innerText={t('NEW')}></NewButton>
          </Box>
          <Paper sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
            <Grid container spacing={1}>
              {data.projects.map((project) => (
                <Grid item key={project._id} xs={12} sm={6} md={4}>
                  <ProjectItem title="Home" subheader="September 14, 2016" />
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
  req,
  locale
}) => {
  const session = await getSession({ req }).catch(() => null)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'money-manager'
      ])),
      session
    }
  }
}

export default MoneyManager
