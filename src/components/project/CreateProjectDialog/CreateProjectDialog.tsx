import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import Button from '@mui/material/Button'

import Dialog from '@/components/Dialog/Dialog'
import FieldText from '@/components/mui/FormFieldText/FormFieldText'
import { AlertColor, Apps } from '@/constants'
import projectHttpService from '@/http-services/project'
import { addProject, enqueueAlert } from '@/redux-actions'

interface CreateProjectDialogProps {
  appAbbreviation: Apps
  handleClose: () => void
}

const CreateProjectDialog: FC<CreateProjectDialogProps> = ({
  appAbbreviation,
  handleClose
}) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .max(25, t('PROJECT_TITLE_MAX_MESSAGE'))
        .required(t('PROJECT_TITLE_REQUIRED_MESSAGE')),
      description: yup.string().max(100, t('PROJECT_DESCRIPTION_MAX_MESSAGE'))
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)

      projectHttpService
        .createProject({ appAbbreviation, values })
        .then((project) => {
          dispatch(addProject(project))

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
      title={t('CREATE_PROJECT_DIALOG_TITLE')}
      wrapBodyWithForm={true}
      handleFormSubmit={formik.handleSubmit}
      contentJsx={
        <>
          <FieldText
            autoFocus={true}
            required={true}
            label={t('PROJECT_TITLE')}
            formik={formik}
            name="title"
          />
          <FieldText
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
            {t('BUTTON_CREATE')}
          </Button>
        </>
      }
    />
  )
}

export default CreateProjectDialog
