import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Dialog from '@/components/Dialog/Dialog'

interface DeleteConfirmationDialogProps {
  title: string
  description: string
  handleDelete: () => void
  closeDialog: () => void
}

const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({
  title,
  description,
  handleDelete,
  closeDialog
}) => {
  const { t } = useTranslation('common')

  return (
    <Dialog
      open={true}
      onClose={closeDialog}
      title={title}
      contentJsx={<Typography>{description}</Typography>}
      actionsJsx={
        <>
          <Button color="secondary" variant="outlined" onClick={closeDialog}>
            {t('BUTTON_CANCEL')}
          </Button>
          <Button
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

export default DeleteConfirmationDialog
