import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

import CreateProjectDialog from '@/components/project/CreateProjectDialog/CreateProjectDialog'
import useDialogStatus from '@/hooks/useDialogStatus'

interface NewProjectButtonProps {
  appAbbreviation: string
}

const NewProjectButton: FC<NewProjectButtonProps> = ({ appAbbreviation }) => {
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

      <CreateProjectDialog
        appAbbreviation={appAbbreviation}
        isOpen={dialogState.isOpen}
        handleClose={handleClose}
      />
    </>
  )
}

export default NewProjectButton
