import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import CreatePostDialog from '@/components/album/CreatePostDialog/CreatePostDialog'
import { POST_MAX_WIDTH } from '@/constants/album'
import { AccessLevels, Apps } from '@/constants/app'
import useDialogStatus from '@/hooks/useDialogStatus'
import { selectUser } from '@/redux-selectors'

const AddPostButton = () => {
  const { t } = useTranslation('common')
  const user = useSelector(selectUser)
  const { state: dialogState, handleOpen, handleClose } = useDialogStatus()

  const canAddPost =
    user!.accessLevel[Apps.familyAlbum] === AccessLevels.SUPER_ADMIN ||
    user!.accessLevel[Apps.familyAlbum] === AccessLevels.ADMIN

  if (!canAddPost) {
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
            handleOpen()
          }}
        >
          {t('ALBUM_ADD_POST')}
        </Button>
      </Box>

      {dialogState.isOpen ? (
        <CreatePostDialog handleClose={handleClose} />
      ) : null}
    </Box>
  )
}

export default AddPostButton
