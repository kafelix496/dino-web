import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Dialog } from '@/components/shared/Dialog/Dialog'
import { AlertColor, Apps } from '@/constants/app'
import projectHttpService from '@/http-services/project'
import { deleteProject, enqueueAlert, setProjects } from '@/redux-actions'

interface DeleteProjectDialogProps {
  appAbbreviation: Apps
  id: string
  closeDialog: () => void
}

export const DeleteProjectDialog: FC<DeleteProjectDialogProps> = ({
  appAbbreviation,
  id,
  closeDialog
}) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [isSubmitting, setSubmitting] = useState(false)

  const handleDelete = () => {
    setSubmitting(true)

    dispatch(deleteProject(id))

    closeDialog()

    projectHttpService
      .deleteProject({ appAbbreviation, id })
      .catch(() => {
        projectHttpService.getProjects({ appAbbreviation }).then((projects) => {
          dispatch(setProjects(projects))
        })

        dispatch(enqueueAlert(AlertColor.ERROR, t('ERROR_ALERT_MESSAGE')))
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Dialog
      open={true}
      onClose={closeDialog}
      title={t('DELETE_PROJECT_DIALOG_TITLE')}
      contentJsx={<Typography>{t('DELETE_PROJECT_DIALOG_CONTENT')}</Typography>}
      actionsJsx={
        <>
          <Button color="secondary" variant="outlined" onClick={closeDialog}>
            {t('BUTTON_CANCEL')}
          </Button>
          <Button
            disabled={isSubmitting}
            type="submit"
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            {t('BUTTON_DELETE')}
          </Button>
        </>
      }
    />
  )
}
