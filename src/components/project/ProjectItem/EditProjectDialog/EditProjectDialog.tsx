import { useEffect } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { useSWRConfig } from 'swr'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Button from '@mui/material/Button'

import DinoDialog from '@/components/Dialog/Dialog'
import DinoFieldText from '@/components/mui/FormFieldText/FormFieldText'

interface DinoEditProjectDialogProps {
  appType: string
  isOpen: boolean
  handleClose: () => void
  id: string
  title: string
  description: string
}

const DinoEditProjectDialog: FC<DinoEditProjectDialogProps> = ({
  appType,
  isOpen,
  handleClose,
  id,
  title,
  description
}) => {
  const { t } = useTranslation('common')
  const { mutate } = useSWRConfig()
  const formik = useFormik({
    initialValues: { title: '', description: '' },
    validationSchema: yup.object({
      title: yup
        .string()
        .max(15, t('PROJECT_TITLE_MAX_MESSAGE'))
        .required(t('PROJECT_TITLE_REQUIRED_MESSAGE')),
      description: yup.string().max(40, t('PROJECT_DESCRIPTION_MAX_MESSAGE'))
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)

      axios
        .put(`/api/project/${id}?app_type=${appType}`, values)
        .then(() => {
          mutate(`/api/project?app_type=${appType}`)
        })
        .catch(() => {
          alert(t('ERROR_ALERT_MESSAGE'))
        })
        .finally(() => {
          setSubmitting(false)
          handleClose()
        })
    }
  })

  useEffect(() => {
    if (isOpen) {
      formik.resetForm()
      formik.setTouched({ title: true })
      formik.setValues({ title, description })
    }
  }, [isOpen, title, description])

  return (
    <DinoDialog
      open={isOpen}
      onClose={handleClose}
      title={t('EDIT_PROJECT_DIALOG_TITLE')}
      wrapBodyWithForm={true}
      handleFormSubmit={formik.handleSubmit}
      contentJsx={
        <>
          <DinoFieldText
            autoFocus={true}
            required={true}
            label={t('PROJECT_TITLE')}
            formik={formik}
            name="title"
          />
          <DinoFieldText
            label={t('PROJECT_DESCRIPTION')}
            formik={formik}
            name="description"
          />
        </>
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

export default DinoEditProjectDialog
