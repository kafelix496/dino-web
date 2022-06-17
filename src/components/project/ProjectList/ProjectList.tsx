import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { Apps } from '@/constants'
import { selectProjectList } from '@/redux-selectors'
import { getCreatedAtTxt, getUpdatedAtTxt } from '@/utils'

const ProjectItem = dynamic(
  () => import('@/components/project/ProjectItem/ProjectItem'),
  { ssr: false }
)

interface ProjectListProps {
  appAbbreviation: Apps
}

const ProjectList: FC<ProjectListProps> = ({ appAbbreviation }) => {
  const { t } = useTranslation('common')
  const projects = useSelector(selectProjectList)

  return (
    <Grid container spacing={1}>
      {(projects ?? []).map((project) => (
        <Grid item key={project._id} xs={12} sm={6} md={4}>
          <ProjectItem
            appAbbreviation={appAbbreviation}
            id={project._id}
            title={project.title}
            subTitle={
              <Typography variant="subtitle2" color="text.secondary">
                {getCreatedAtTxt(t, project.createdAt)}
              </Typography>
            }
            tooltip={
              <>
                <Typography variant="subtitle2" color="inherit">
                  {getCreatedAtTxt(t, project.createdAt)}
                </Typography>
                <Typography variant="subtitle2" color="inherit">
                  {getUpdatedAtTxt(t, project.updatedAt)}
                </Typography>
                {project.description ? (
                  <Typography variant="subtitle2" color="inherit">
                    {`${t('PROJECT_DESCRIPTION')}: ${project.description}`}
                  </Typography>
                ) : null}
              </>
            }
            description={project.description}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProjectList
