import { useTranslation } from 'next-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import PostFormDialog from '@/components/album/PostFormDialog/PostFormDialog'
import { POST_MAX_WIDTH } from '@/constants/album'
import { useDialogStatus } from '@/hooks/useDialogStatus'
import { useIsAdminOrAbove } from '@/hooks/useIsAdmin'

const AddPostButton = () => {
  const { t } = useTranslation('common')
  const { state: dialogState, openDialog, closeDialog } = useDialogStatus()
  const isAdminOrAbove = useIsAdminOrAbove()

  if (!isAdminOrAbove) {
    return null
  }

  return (
    <Box className="__d-flex-center __d-flex-col">
      <Box
        className="__d-h-full"
        sx={{
          width: '90%',
          maxWidth: POST_MAX_WIDTH
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            openDialog()
          }}
        >
          {t('ALBUM_ADD_POST')}
        </Button>
      </Box>

      {dialogState.isOpen ? <PostFormDialog closeDialog={closeDialog} /> : null}
    </Box>
  )
}

export default AddPostButton
