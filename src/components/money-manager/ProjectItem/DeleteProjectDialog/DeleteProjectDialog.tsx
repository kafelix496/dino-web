import { useState } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { useSWRConfig } from 'swr'

import Button from '@mui/material/Button'

import DinoDialog from '@/components/Dialog/Dialog'

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
  const { t } = useTranslation(['common', 'money-manager'])
  const { mutate } = useSWRConfig()
  const [isSubmitting, setSubmitting] = useState(false)

  const handleDelete = () => {
    setSubmitting(true)

    axios
      .delete(`/api/project/${id}`)
      .then(() => {
        mutate('/api/project')
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
      title={t('DELETE_PROJECT', { ns: 'money-manager' })}
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
            {t('BUTTON_CONFIRM')}
          </Button>
        </>
      }
    />
  )
}

export default DinoNewProjectFormDialog
