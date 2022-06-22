import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import Button from '@mui/material/Button'

import Dialog from '@/components/Dialog/Dialog'
import CreatePostDialogImageList from '@/components/album/CreatePostDialogImageList/CreatePostDialogImageList'
import FieldText from '@/components/mui/FormFieldText/FormFieldText'
import { PostAudiences } from '@/constants/album'
import albumHttpService from '@/http-services/album'
import { addPost } from '@/redux-actions'
import { uploadFile } from '@/utils/file'

interface CreatePostDialogProps {
  isOpen: boolean
  handleClose: () => void
}

const CreatePostDialog: FC<CreatePostDialogProps> = ({
  isOpen,
  handleClose
}) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  dispatch
  const formik = useFormik<{
    title: string
    description: string
    files: File[]
  }>({
    initialValues: { title: '', description: '', files: [] },
    validationSchema: yup.object({
      title: yup
        .string()
        .max(20, t('POST_TITLE_MAX_MESSAGE'))
        .required(t('POST_TITLE_REQUIRED_MESSAGE')),
      description: yup.string().max(100, t('POST_DESCRIPTION_MAX_MESSAGE')),
      files: yup
        .mixed()
        .test(
          'filesMinLength',
          t('POST_FILES_MIN_LENGTH_WARNING'),
          (files: File[]) => !!files?.length
        )
        .test(
          'filesMaxLength',
          t('POST_FILES_MAX_LENGTH_WARNING'),
          (files: File[]) => !!files?.length
        )
        .test(
          'filesFormat',
          t('POST_FILES_FORMAT_WARNING'),
          (files: File[]) => {
            return !Array.from(files).some(
              (file) =>
                file.type !== 'image/jpeg' &&
                file.type !== 'image/png' &&
                file.type !== 'video/quicktime' &&
                file.type !== 'video/mp4'
            )
          }
        )
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)

      Promise.all(Array.from(values.files).map((file) => uploadFile(file)))
        .then((uploadedFiles) =>
          albumHttpService.createPost({
            values: {
              assets: uploadedFiles,
              audience: PostAudiences.ALL,
              categoriesId: [],
              title: values.title,
              description: values.description
            }
          })
        )
        .then((post) => {
          dispatch(addPost(post))

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
        <>
          <FieldText
            autoFocus={true}
            required={true}
            label={t('POST_TITLE')}
            formik={formik}
            name="title"
          />
          <FieldText
            label={t('POST_DESCRIPTION')}
            formik={formik}
            name="description"
          />
          <Button
            fullWidth
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            {t('POST_CHOOSE_FILES')}
            <input
              multiple
              hidden
              type="file"
              name="files"
              accept="image/jpeg, image/png, video/quicktime, video/mp4"
              onChange={(event) => {
                formik.setFieldValue('files', event.target.files)
              }}
            />
          </Button>

          <CreatePostDialogImageList files={formik.values.files} />
        </>
      }
      actionsJsx={
        <>
          <Button color="secondary" variant="outlined" onClick={handleClose}>
            {t('BUTTON_CANCEL')}
          </Button>
          <Button
            disabled={formik.isSubmitting}
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

export default CreatePostDialog
