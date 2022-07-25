import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Dialog from '@/components/Dialog/Dialog'
import { AlertColor } from '@/constants/app'
import albumHttpService from '@/http-services/album'
import { deleteCategory, enqueueAlert, setCategories } from '@/redux-actions'

interface DeleteCategoryDialogProps {
  id: string
  handleClose: () => void
}

const DeleteCategoryDialog: FC<DeleteCategoryDialogProps> = ({
  id,
  handleClose
}) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [isSubmitting, setSubmitting] = useState(false)

  const handleDelete = () => {
    setSubmitting(true)

    dispatch(deleteCategory(id))

    handleClose()

    albumHttpService
      .deleteCategory({ id })
      .catch(() => {
        albumHttpService.getCategories().then((categories) => {
          dispatch(setCategories(categories))
        })

        dispatch(enqueueAlert(AlertColor.ERROR, t('ERROR_ALERT_MESSAGE')))
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      title={t('DELETE_CATEGORY_DIALOG_TITLE')}
      contentJsx={
        <Typography>{t('DELETE_CATEGORY_DIALOG_CONTENT')}</Typography>
      }
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
            {t('BUTTON_DELETE')}
          </Button>
        </>
      }
    />
  )
}

export default DeleteCategoryDialog
