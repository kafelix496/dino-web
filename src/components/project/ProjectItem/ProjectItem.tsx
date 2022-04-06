import Link from 'next/link'
import type { FC } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import type { Theme } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import DeleteProjectDialog from '@/components/project/DeleteProjectDialog/DeleteProjectDialog'
import EditProjectDialog from '@/components/project/EditProjectDialog/EditProjectDialog'
import useDialogStatus from '@/hooks/useDialogStatus'

interface ProjectItemProps {
  appAbbreviation: string
  id: string
  title: string
  subTitle: string | JSX.Element
  tooltip: string | JSX.Element
  description?: string
}

const ProjectItem: FC<ProjectItemProps> = ({
  appAbbreviation,
  id,
  title,
  subTitle,
  tooltip,
  description = ''
}) => {
  const { state: dialogState, handleOpen, handleClose } = useDialogStatus()

  return (
    <>
      <Card
        className="__d-cursor-pointer"
        variant="outlined"
        sx={{
          maxWidth: 300,
          '&:hover': {
            backgroundColor: (theme: Theme) => theme.palette.action.hover
          }
        }}
      >
        <Tooltip followCursor title={tooltip}>
          <div>
            <CardHeader title={title} subheader={subTitle} />
          </div>
        </Tooltip>
        <CardActions disableSpacing className="__d-justify-end">
          <Link href={`/app/${appAbbreviation}/project/${id}`}>
            <IconButton>
              <PlayArrowIcon />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => {
              handleOpen('edit')
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              handleOpen('delete')
            }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <EditProjectDialog
        appAbbreviation={appAbbreviation}
        isOpen={dialogState.name === 'edit' && dialogState.isOpen}
        handleClose={handleClose}
        id={id}
        title={title}
        description={description}
      />

      <DeleteProjectDialog
        appAbbreviation={appAbbreviation}
        isOpen={dialogState.name === 'delete' && dialogState.isOpen}
        handleClose={handleClose}
        id={id}
      />
    </>
  )
}

export default ProjectItem
