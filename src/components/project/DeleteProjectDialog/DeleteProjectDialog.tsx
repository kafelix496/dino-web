import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import type { FC } from 'react'
import { useSWRConfig } from 'swr'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Dialog from '@/components/Dialog/Dialog'

interface DeleteProjectFormDialogProps {
  appType: string
  id: string
  isOpen: boolean
  handleClose: () => void
}

const DeleteProjectFormDialog: FC<DeleteProjectFormDialogProps> = ({
  appType,
  id,
  isOpen,
  handleClose
}) => {
  const { t } = useTranslation('common')
  const { mutate } = useSWRConfig()
  const [isSubmitting, setSubmitting] = useState(false)

  const handleDelete = () => {
    setSubmitting(true)

    axios
      .delete(`/api/project/${id}?app_type=${appType}`)
      .then(() => {
        mutate(`/api/project?app_type=${appType}`)
      })
      .catch(() => {
        alert(t('ERROR_ALERT_MESSAGE'))
      })
      .finally(() => {
        setSubmitting(false)
        handleClose()
      })
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      title={t('DELETE_PROJECT_DIALOG_TITLE')}
      contentJsx={<Typography>{t('DELETE_PROJECT_DIALOG_CONTENT')}</Typography>}
      actionsJsx={
        <>
          <Button color="secondary" variant="outlined" onClick={handleClose}>
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

export default DeleteProjectFormDialog
