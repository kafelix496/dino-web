import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

import Dialog from '@/components/Dialog/Dialog'
import PostFormDialogAssetList from '@/components/album/PostFormDialogAssetList/PostFormDialogAssetList'
import FieldMultiSelect from '@/components/mui/FormFieldMultiSelect/FormFieldMultiSelect'
import FieldSelect from '@/components/mui/FormFieldSelect/FormFieldSelect'
import FieldText from '@/components/mui/FormFieldText/FormFieldText'
import { PostAudiences } from '@/constants/album'
import { AlertColor, FileInputExtensions, S3Paths } from '@/constants/app'
import albumHttpService from '@/http-services/album'
import { addPost, enqueueAlert, updatePost } from '@/redux-actions'
import { selectCategoryList } from '@/redux-selectors'
import type { Post } from '@/types/album'
import { deleteFilesObject, uploadFile } from '@/utils/file'

interface PostFormDialogProps {
  post?: Post
  closeDialog: () => void
}

const PostFormDialog: FC<PostFormDialogProps> = ({ post, closeDialog }) => {
  const isCreating = !post
  const { t } = useTranslation('common')
  const categories = useSelector(selectCategoryList)
  const dispatch = useDispatch()
  const formik = useFormik<{
    title: string
    description: string
    audience: PostAudiences
    categoriesId: string[]
    files?: File[]
  }>({
    initialValues: {
      title: !isCreating ? post.title : '',
      description: !isCreating ? post.description : '',
      audience: !isCreating ? post.audience : PostAudiences.ALL,
      categoriesId: !isCreating
        ? post.categories.map((category) => category._id)
        : [],
      ...(isCreating ? { files: [] } : {})
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .max(20, t('POST_TITLE_MAX_MESSAGE'))
        .required(t('POST_TITLE_REQUIRED_MESSAGE')),
      description: yup.string().max(100, t('POST_DESCRIPTION_MAX_MESSAGE')),
      audience: yup.mixed().oneOf(Object.values(PostAudiences)),
      categoriesId: yup.array(),
      ...(isCreating
        ? {
            files: yup
              .mixed()
              .test(
                'filesMinLength',
                t('POST_FILES_MIN_LENGTH_WARNING'),
                (files: File[]) => !!files.length
              )
              .test(
                'filesMaxLength',
                t('POST_FILES_MAX_LENGTH_WARNING'),
                (files: File[]) => !!files.length
              )
              .test(
                'filesFormat',
                t('POST_FILES_FORMAT_WARNING'),
                (files: File[]) =>
                  !Array.from(files).some(
                    (file) =>
                      !(
                        Object.values(FileInputExtensions) as string[]
                      ).includes(file.type)
                  )
              )
          }
        : {})
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)

      try {
        if (isCreating) {
          const uploadedFiles = await Promise.all(
            Array.from(values.files!).map((file) =>
              uploadFile(file, S3Paths.ALBUM)
            )
          )

          const postResult = await albumHttpService
            .createPost({
              values: {
                assets: uploadedFiles,
                audience: values.audience,
                categories: values.categoriesId,
                title: values.title,
                description: values.description
              }
            })
            .catch(() => {
              // if something wrong on the database,
              // delete all files uploaded
              deleteFilesObject(uploadedFiles.map((file) => file.key))

              throw new Error()
            })

          dispatch(addPost(postResult.post, postResult.assets))
        } else {
          const updatedPost = await albumHttpService.updatePost({
            id: post._id,
            values: {
              audience: values.audience,
              categories: values.categoriesId,
              title: values.title,
              description: values.description
            }
          })

          dispatch(updatePost(updatedPost._id, { ...post, ...updatedPost }))
        }

        closeDialog()
      } catch (_) {
        dispatch(enqueueAlert(AlertColor.ERROR, t('ERROR_ALERT_MESSAGE')))
      }

      setSubmitting(false)
    }
  })
  const audienceOptions = [
    { label: t('POST_AUDIENCE_ALL'), value: PostAudiences.ALL },
    { label: t('POST_AUDIENCE_VIEWER'), value: PostAudiences.VIEWER }
  ]
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category._id
  }))
  const inputAccept = Object.values(FileInputExtensions).join(', ')

  return (
    <Dialog
      open={true}
      onClose={closeDialog}
      title={t(
        isCreating ? 'CREATE_POST_DIALOG_TITLE' : 'EDIT_POST_DIALOG_TITLE'
      )}
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
            multiline={true}
            formik={formik}
            name="description"
          />
          <FieldSelect
            label={t('POST_AUDIENCE')}
            formik={formik}
            name="audience"
            options={audienceOptions}
          />
          <FieldMultiSelect
            label={t('POST_CATEGORIES')}
            formik={formik}
            name="categoriesId"
            options={categoryOptions}
          />
          {isCreating && (
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
                accept={inputAccept}
                onChange={(event) => {
                  formik.setFieldValue('files', event.target.files)
                }}
              />
            </Button>
          )}

          {isCreating && (
            <PostFormDialogAssetList files={formik.values.files!} />
          )}

          {isCreating && formik.submitCount >= 1 && formik.errors.files ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {formik.errors.files as string}
            </Alert>
          ) : null}
        </>
      }
      actionsJsx={
        <>
          <Button color="secondary" variant="outlined" onClick={closeDialog}>
            {t('BUTTON_CANCEL')}
          </Button>
          <Button
            disabled={formik.isSubmitting}
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

export default PostFormDialog
