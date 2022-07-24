import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

import CreateProjectDialog from '@/components/project/CreateProjectDialog/CreateProjectDialog'
import { Apps } from '@/constants'
import useDialogStatus from '@/hooks/useDialogStatus'

interface NewProjectButtonProps {
  appAbbreviation: Apps
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

      {dialogState.isOpen && (
        <CreateProjectDialog
          appAbbreviation={appAbbreviation}
          handleClose={handleClose}
        />
      )}
    </>
  )
}

export default NewProjectButton
