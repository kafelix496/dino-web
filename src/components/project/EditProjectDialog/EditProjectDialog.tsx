import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import Button from '@mui/material/Button'

import Dialog from '@/components/Dialog/Dialog'
import FieldText from '@/components/mui/FormFieldText/FormFieldText'
import { AlertColor, Apps } from '@/constants/app'
import projectHttpService from '@/http-services/project'
import { enqueueAlert, setProjects, updateProject } from '@/redux-actions'

interface EditProjectDialogProps {
  appAbbreviation: Apps
  id: string
  title: string
  description: string
  closeDialog: () => void
}

const EditProjectDialog: FC<EditProjectDialogProps> = ({
  appAbbreviation,
  id,
  title,
  description,
  closeDialog
}) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: { title, description },
    validationSchema: yup.object({
      title: yup
        .string()
        .max(25, t('PROJECT_TITLE_MAX_MESSAGE'))
        .required(t('PROJECT_TITLE_REQUIRED_MESSAGE')),
      description: yup.string().max(100, t('PROJECT_DESCRIPTION_MAX_MESSAGE'))
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)

      dispatch(updateProject(id, values))

      closeDialog()

      projectHttpService
        .updateProject({ appAbbreviation, id, values })
        .then((project) => {
          dispatch(updateProject(id, project))
        })
        .catch(() => {
          projectHttpService
            .getProjects({ appAbbreviation })
            .then((projects) => {
              dispatch(setProjects(projects))
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
      onClose={closeDialog}
      title={t('EDIT_PROJECT_DIALOG_TITLE')}
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
          <Button color="secondary" variant="outlined" onClick={closeDialog}>
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

export default EditProjectDialog
