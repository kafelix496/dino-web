import type { FC } from 'react'
import { useTranslation } from 'next-i18next'

import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

import DinoNewProjectFormDialog from './NewProjectFormDialog/NewProjectFormDialog'
import useDialogStatus from '@/hooks/useDialogStatus'

const DinoNewProjectButton: FC = () => {
  const { t } = useTranslation('common')
  const { state: dialogState, handleOpen, handleClose } = useDialogStatus()

  return (
    <>
      <Button
        data-testid="button"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          handleOpen()
        }}
      >
        {t('BUTTON_NEW')}
      </Button>

      <DinoNewProjectFormDialog
        isOpen={dialogState.isOpen}
        handleClose={handleClose}
      />
    </>
  )
}

export default DinoNewProjectButton
