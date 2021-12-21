import type { FC } from 'react'
import Link from 'next/link'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Theme } from '@mui/material'

import DinoEditProjectDialog from './EditProjectDialog/EditProjectDialog'
import DinoDeleteProjectDialog from './DeleteProjectDialog/DeleteProjectDialog'

import useDialogStatus from '@/hooks/useDialogStatus'

interface DinoProjectItemProps {
  appType: string
  id: string
  title: string
  subTitle: string | JSX.Element
  tooltip: string | JSX.Element
  description?: string
}

const DinoProjectItem: FC<DinoProjectItemProps> = ({
  appType,
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
        variant="outlined"
        sx={{
          maxWidth: 300,
          cursor: 'pointer',
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
        <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
          <Link href={`project/${id}`}>
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

      <DinoEditProjectDialog
        appType={appType}
        isOpen={dialogState.name === 'edit' && dialogState.isOpen}
        handleClose={handleClose}
        id={id}
        title={title}
        description={description}
      />

      <DinoDeleteProjectDialog
        appType={appType}
        isOpen={dialogState.name === 'delete' && dialogState.isOpen}
        handleClose={handleClose}
        id={id}
      />
    </>
  )
}

export default DinoProjectItem
