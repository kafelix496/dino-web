import { useEffect } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { useSWRConfig } from 'swr'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import DinoFormFieldText from '@/components/forms/DinoFormFieldText/DinoFormFieldText'

interface NewProjectFormDialogProps {
  isOpen: boolean
  handleClose: () => void
}

const NewProjectFormDialog: FC<NewProjectFormDialogProps> = ({
  isOpen,
  handleClose
}) => {
  const { t } = useTranslation(['common', 'money-manager'])
  const { mutate } = useSWRConfig()
  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
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
        .post('/api/project', values)
        .then(() => {
          mutate('/api/project')
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
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        {t('CREATE_NEW_PROJECT', { ns: 'money-manager' })}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <DinoFormFieldText
            label={t('PROJECT_TITLE')}
            formik={formik}
            name="title"
          />
          <DinoFormFieldText
            label={t('PROJECT_DESCRIPTION')}
            formik={formik}
            name="description"
          />
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default NewProjectFormDialog
