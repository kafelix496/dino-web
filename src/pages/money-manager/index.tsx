import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useSWR from 'swr'
import axios from 'axios'

import DinoNewProjectButton from '@/components/money-manager/NewProjectButton/NewProjectButton'
import DinoProjectItem from '@/components/money-manager/ProjectItem/ProjectItem'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import type { ProjectType } from '@/global-types'

const MoneyManager: NextPage = () => {
  const router = useRouter()
  const { data, error } =
    useSWR<{ status: boolean; projects: ProjectType[] }>('/api/project')

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
            <DinoNewProjectButton></DinoNewProjectButton>
          </Box>
          <Paper elevation={4} sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
            <Grid container spacing={1}>
              {data!.projects.map((project) => (
                <Grid item key={project._id} xs={12} sm={6} md={4}>
                  <DinoProjectItem
                    title={project.title}
                    subTitle={project.createdAt}
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

  const data = await axios
    .get(`${process.env.PAGE_URL}/api/project`, {
      headers: {
        Cookie: req.headers.cookie!
      }
    })
    .then((res) => res.data)
    .catch(() => null)

  if (!data || data?.status === false) {
    return {
      redirect: {
        permanent: false,
        destination: '/500'
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'money-manager'
      ])),
      session,
      fallback: {
        '/api/project': data
      }
    }
  }
}

export default MoneyManager
