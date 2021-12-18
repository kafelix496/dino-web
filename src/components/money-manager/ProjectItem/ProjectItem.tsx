import type { FC } from 'react'
import Link from 'next/link'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Theme } from '@mui/material'

import DinoEditProjectFormDialog from './EditProjectFormDialog/EditProjectFormDialog'
import DinoDeleteProjectDialog from './DeleteProjectDialog/DeleteProjectDialog'
import useDialogStatus from '@/hooks/useDialogStatus'

interface DinoProjectItemProps {
  id: string
  title: string
  subTitle: string | JSX.Element
  description?: string
}

const DinoProjectItem: FC<DinoProjectItemProps> = ({
  id,
  title,
  subTitle,
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
            backgroundColor: (theme: Theme) => theme.palette.bgHoverDim
          }
        }}
      >
        <CardHeader title={title} subheader={subTitle} />
        {description ? (
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        ) : null}
        <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
          <Link href={`project/${id}`}>
            <IconButton title="start-project">
              <PlayArrowIcon />
            </IconButton>
          </Link>
          <IconButton
            title="edit"
            onClick={() => {
              handleOpen('edit')
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            title="delete"
            onClick={() => {
              handleOpen('delete')
            }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <DinoEditProjectFormDialog
        isOpen={dialogState.name === 'edit' && dialogState.isOpen}
        handleClose={handleClose}
        id={id}
        title={title}
        description={description}
      />

      <DinoDeleteProjectDialog
        isOpen={dialogState.name === 'delete' && dialogState.isOpen}
        handleClose={handleClose}
        id={id}
      />
    </>
  )
}

export default DinoProjectItem
