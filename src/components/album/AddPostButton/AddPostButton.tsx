import { useTranslation } from 'next-i18next'

import Button from '@mui/material/Button'

import { PostFormDialog } from '@/components/album/PostFormDialog/PostFormDialog'
import { useDialogStatus } from '@/hooks/useDialogStatus'
import { useIsAdminOrAbove } from '@/hooks/useIsAdmin'

export const AddPostButton = () => {
  const { t } = useTranslation('common')
  const { state: dialogState, openDialog, closeDialog } = useDialogStatus()
  const { isAdminOrAbove } = useIsAdminOrAbove()

  if (!isAdminOrAbove) {
    return null
  }

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          openDialog()
        }}
      >
        {t('ALBUM_ADD_POST')}
      </Button>

      {dialogState.isOpen ? <PostFormDialog closeDialog={closeDialog} /> : null}
    </>
  )
}
