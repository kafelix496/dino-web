import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import * as yup from 'yup'

import Button from '@mui/material/Button'

import { Dialog } from '@/components/Dialog/Dialog'
import { FieldText } from '@/components/mui/FormFieldText/FormFieldText'
import { useCreateCategory, useUpdateCategory } from '@/hooks/useHttpAlbum'
import type { Category } from '@/types/album'

interface CategoryFormDialogProps {
  category?: Category
  closeDialog: () => void
}

export const CategoryFormDialog: FC<CategoryFormDialogProps> = ({
  category,
  closeDialog
}) => {
  const isCreating = !category
  const { t } = useTranslation('common')
  const { execute: executeCreate } = useCreateCategory()
  const { execute: executeUpdate } = useUpdateCategory()
  const formik = useFormik({
    validateOnMount: true,
    initialValues: { name: category?.name ?? '' },
    validationSchema: yup.object({
      name: yup
        .string()
        .max(10, t('CATEGORY_NAME_MAX_MESSAGE'))
        .required(t('CATEGORY_NAME_REQUIRED_MESSAGE'))
    }),
    onSubmit: (values, { setSubmitting }) => {
      if (isCreating) {
        setSubmitting(true)

        executeCreate(values)
          .then(() => {
            closeDialog()
          })
          .catch(() => {
            setSubmitting(false)
          })
      } else {
        closeDialog()

        executeUpdate(category._id, values)
      }
    }
  })

  return (
    <Dialog
      open={true}
      onClose={closeDialog}
      title={t(
        isCreating
          ? 'CREATE_CATEGORY_DIALOG_TITLE'
          : 'EDIT_CATEGORY_DIALOG_TITLE'
      )}
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
          <Button
            type="button"
            color="secondary"
            variant="outlined"
            onClick={closeDialog}
          >
            {t('BUTTON_CANCEL')}
          </Button>
          <Button
            disabled={formik.isSubmitting || !formik.isValid}
            type="submit"
            color="success"
            variant="contained"
          >
            {t(isCreating ? 'BUTTON_CREATE' : 'BUTTON_EDIT')}
          </Button>
        </>
      }
    />
  )
}
