import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

import { CreateProjectDialog } from '@/components/project/CreateProjectDialog/CreateProjectDialog'
import { Apps } from '@/constants/app'
import { useDialogStatus } from '@/hooks/useDialogStatus'

interface NewProjectButtonProps {
  appAbbreviation: Apps
}

export const NewProjectButton: FC<NewProjectButtonProps> = ({
  appAbbreviation
}) => {
  const { t } = useTranslation('common')
  const { state: dialogState, openDialog, closeDialog } = useDialogStatus()

  return (
    <>
      <Button
        data-testid="button"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          openDialog()
        }}
      >
        {t('BUTTON_NEW')}
      </Button>

      {dialogState.isOpen && (
        <CreateProjectDialog
          appAbbreviation={appAbbreviation}
          closeDialog={closeDialog}
        />
      )}
    </>
  )
}
