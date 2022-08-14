import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Dialog from '@/components/Dialog/Dialog'
import { AlertColor } from '@/constants/app'
import albumHttpService from '@/http-services/album'
import {
  deletePost,
  enqueueAlert,
  temporaryDeletePost,
  undoTemporaryDeletedPost
} from '@/redux-actions'
import { deleteFilesObject } from '@/utils/file'

interface DeletePostDialogProps {
  id: string
  assetKeys: string[]
  closeDialog: () => void
}

const DeletePostDialog: FC<DeletePostDialogProps> = ({
  id,
  assetKeys,
  closeDialog
}) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [isSubmitting, setSubmitting] = useState(false)

  const handleDelete = () => {
    setSubmitting(true)

    dispatch(temporaryDeletePost(id))

    closeDialog()

    albumHttpService
      .deletePost({ id })
      .then(() => {
        deleteFilesObject(assetKeys)

        dispatch(deletePost(id))
      })
      .catch(() => {
        dispatch(undoTemporaryDeletedPost(id))

        dispatch(enqueueAlert(AlertColor.ERROR, t('ERROR_ALERT_MESSAGE')))
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Dialog
      open={true}
      onClose={closeDialog}
      title={t('DELETE_CATEGORY_DIALOG_TITLE')}
      contentJsx={
        <Typography>{t('DELETE_CATEGORY_DIALOG_CONTENT')}</Typography>
      }
      actionsJsx={
        <>
          <Button color="secondary" variant="outlined" onClick={closeDialog}>
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

export default DeletePostDialog
