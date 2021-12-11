import type { FC } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Theme } from '@mui/material'

interface ProjectItemProps {
  title: string
  subheader: string
}

const ProjectItem: FC<ProjectItemProps> = ({ title, subheader }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 300,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: (theme: Theme) => theme.palette.bgHoverDim
        }
      }}
    >
      <CardHeader title={title} subheader={subheader} />
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <IconButton aria-label="start-project" title="start-project">
          <PlayArrowIcon />
        </IconButton>
        <IconButton aria-label="edit" title="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" title="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ProjectItem
