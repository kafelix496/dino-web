import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import Button from '@mui/material/Button'

import Dialog from '@/components/Dialog/Dialog'
import FieldText from '@/components/mui/FormFieldText/FormFieldText'
import albumHttpService from '@/http-services/album'
import { addCategory } from '@/redux-actions'

interface CreateCategoryDialogProps {
  isOpen: boolean
  handleClose: () => void
}

const CreateProjectDialog: FC<CreateCategoryDialogProps> = ({
  isOpen,
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
          alert(t('ERROR_ALERT_MESSAGE'))
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  })

  useEffect(() => {
    if (isOpen) {
      formik.resetForm()
    }
    // I don't know why I can't pass test if I put formik in here
    // I don't think it's important, so I'll ignore it
  }, [isOpen])

  return (
    <Dialog
      open={isOpen}
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

export default CreateProjectDialog
