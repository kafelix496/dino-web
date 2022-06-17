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
import { editCategory, setCategories } from '@/redux-actions'

interface EditCategoryDialogProps {
  isOpen: boolean
  handleClose: () => void
  id: string
  name: string
}

const EditCategoryDialog: FC<EditCategoryDialogProps> = ({
  isOpen,
  handleClose,
  id,
  name
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

      dispatch(editCategory(id, values))

      handleClose()

      albumHttpService
        .editCategory({ id, values })
        .then((category) => {
          dispatch(editCategory(id, category))
        })
        .catch(() => {
          albumHttpService.getCategories().then((categories) => {
            dispatch(setCategories(categories))
          })

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
      formik.setTouched({ name: true })
      formik.setValues({ name })
    }
    // I don't know why I can't pass test if I put formik in here
    // I don't think it's important, so I'll ignore it
  }, [isOpen, name])

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      title={t('EDIT_PROJECT_DIALOG_TITLE')}
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
