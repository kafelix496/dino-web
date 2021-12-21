import { useState } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { useSWRConfig } from 'swr'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import DinoDialog from '@/components/Dialog/Dialog'
import { Projects } from '@/global-types'

interface DinoNewProjectFormDialogProps {
  id: string
  isOpen: boolean
  handleClose: () => void
}

const DinoNewProjectFormDialog: FC<DinoNewProjectFormDialogProps> = ({
  id,
  isOpen,
  handleClose
}) => {
  const { t } = useTranslation(['common', 'money-tracker'])
  const { mutate } = useSWRConfig()
  const [isSubmitting, setSubmitting] = useState(false)

  const handleDelete = () => {
    setSubmitting(true)

    axios
      .delete(`/api/project/${id}?type=${Projects.moneyTracker}`)
      .then(() => {
        mutate(`/api/project?type=${Projects.moneyTracker}`)
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
    <DinoDialog
      open={isOpen}
      onClose={handleClose}
      title={t('DELETE_PROJECT_TITLE', { ns: 'money-tracker' })}
      contentJsx={
        <Typography>
          {t('DELETE_PROJECT_CONTENT', { ns: 'money-tracker' })}
        </Typography>
      }
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

export default DinoNewProjectFormDialog
