import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import Button from '@mui/material/Button'

import Dialog from '@/components/Dialog/Dialog'
import FieldText from '@/components/mui/FormFieldText/FormFieldText'
import { AlertColor } from '@/constants/app'
import albumHttpService from '@/http-services/album'
import { enqueueAlert, setCategories, updateCategory } from '@/redux-actions'

interface EditCategoryDialogProps {
  handleClose: () => void
  id: string
  name: string
}

const EditCategoryDialog: FC<EditCategoryDialogProps> = ({
  handleClose,
  id,
  name
}) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: { name },
    validationSchema: yup.object({
      name: yup
        .string()
        .max(10, t('CATEGORY_NAME_MAX_MESSAGE'))
        .required(t('CATEGORY_NAME_REQUIRED_MESSAGE'))
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)

      dispatch(updateCategory(id, values))

      handleClose()

      albumHttpService
        .updateCategory({ id, values })
        .then((category) => {
          dispatch(updateCategory(id, category))
        })
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
  })

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      title={t('UPDATE_CATEGORY_DIALOG_TITLE')}
      wrapBodyWithForm={true}
      handleFormSubmit={formik.handleSubmit}
      contentJsx={
        <FieldText
          autoFocus={true}
          required={true}
          label={t('CATEGORY_NAME')}
          formik={formik}
          name="name"
        />
      }
      actionsJsx={
        <>
          <Button color="secondary" variant="outlined" onClick={handleClose}>
            {t('BUTTON_CANCEL')}
          </Button>
          <Button
            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
            type="submit"
            color="success"
            variant="contained"
          >
            {t('BUTTON_CONFIRM')}
          </Button>
        </>
      }
    />
  )
}

export default EditCategoryDialog
