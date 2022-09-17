import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'

import type { ProjectListItemProps } from '@/components/project/ProjectListItem/ProjectListItem'
import { Apps } from '@/constants/app'
import { selectProjectList } from '@/redux-selectors'

const ProjectListItem = dynamic<ProjectListItemProps>(
  () =>
    import('@/components/project/ProjectListItem/ProjectListItem').then(
      (mod) => mod.ProjectListItem
    ),
  { ssr: false }
)

interface ProjectListProps {
  appAbbreviation: Apps
}

export const ProjectList: FC<ProjectListProps> = ({ appAbbreviation }) => {
  const projects = useSelector(selectProjectList)

  return (
    <Grid container spacing={1}>
      {(projects ?? []).map((project) => (
        <Grid item key={project._id} xs={12} sm={6} md={4}>
          <ProjectListItem
            appAbbreviation={appAbbreviation}
            id={project._id}
            title={project.title}
            description={project.description}
            createdAt={project.createdAt}
            updatedAt={project.updatedAt}
          />
        </Grid>
      ))}
    </Grid>
  )
}
