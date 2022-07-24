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
import { addCategory, enqueueAlert } from '@/redux-actions'

interface CreateCategoryDialogProps {
  handleClose: () => void
}

const CreateCategoryDialog: FC<CreateCategoryDialogProps> = ({
  handleClose
}) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: yup.object({
      name: yup
        .string()
        .max(10, t('CATEGORY_NAME_MAX_MESSAGE'))
        .required(t('CATEGORY_NAME_REQUIRED_MESSAGE'))
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)

      albumHttpService
        .createCategory({ values })
        .then((category) => {
          dispatch(addCategory(category))

          handleClose()
        })
        .catch(() => {
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
      title={t('CREATE_CATEGORY_DIALOG_TITLE')}
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
            {t('BUTTON_CREATE')}
          </Button>
        </>
      }
    />
  )
}

export default CreateCategoryDialog
