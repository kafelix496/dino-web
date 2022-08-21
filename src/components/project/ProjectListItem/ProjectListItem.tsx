import { useTranslation } from 'next-i18next'
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
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'

import DeleteProjectDialog from '@/components/project/DeleteProjectDialog/DeleteProjectDialog'
import EditProjectDialog from '@/components/project/EditProjectDialog/EditProjectDialog'
import { Apps } from '@/constants/app'
import { useDialogStatus } from '@/hooks/useDialogStatus'
import { useCreatedAtText, useUpdatedAtText } from '@/hooks/useTimestampText'

interface ProjectListItemProps {
  appAbbreviation: Apps
  id: string
  title: string
  description?: string
  createdAt: string
  updatedAt: string
}

const ProjectListItem: FC<ProjectListItemProps> = ({
  appAbbreviation,
  id,
  title,
  description = '',
  createdAt,
  updatedAt
}) => {
  const { t } = useTranslation('common')
  const { state: dialogState, openDialog, closeDialog } = useDialogStatus()
  const { createdAtText } = useCreatedAtText(createdAt)
  const { updatedAtText } = useUpdatedAtText(updatedAt)

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
        <Tooltip
          followCursor
          title={
            <>
              <Typography variant="subtitle2" color="inherit">
                {createdAtText}
              </Typography>
              <Typography variant="subtitle2" color="inherit">
                {updatedAtText}
              </Typography>
              {description ? (
                <Typography variant="subtitle2" color="inherit">
                  {`${t('PROJECT_DESCRIPTION')}: ${description}`}
                </Typography>
              ) : null}
            </>
          }
        >
          <Box>
            <CardHeader
              title={title}
              subheader={
                <Typography variant="subtitle2" color="text.secondary">
                  {createdAtText}
                </Typography>
              }
            />
          </Box>
        </Tooltip>
        <CardActions disableSpacing className="__d-justify-end">
          <Link href={`/app/${appAbbreviation}/project/${id}`}>
            <IconButton>
              <PlayArrowIcon />
            </IconButton>
          </Link>
          <IconButton
            onClick={() => {
              openDialog('edit')
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              openDialog('delete')
            }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      {dialogState.name === 'edit' && dialogState.isOpen && (
        <EditProjectDialog
          appAbbreviation={appAbbreviation}
          id={id}
          title={title}
          description={description}
          closeDialog={closeDialog}
        />
      )}

      {dialogState.name === 'delete' && dialogState.isOpen && (
        <DeleteProjectDialog
          appAbbreviation={appAbbreviation}
          id={id}
          closeDialog={closeDialog}
        />
      )}
    </>
  )
}

export default ProjectListItem
