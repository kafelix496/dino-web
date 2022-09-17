import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import * as yup from 'yup'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

import { Dialog } from '@/components/Dialog/Dialog'
import { PostFormDialogAssetList } from '@/components/album/PostFormDialogAssetList/PostFormDialogAssetList'
import { PostFormDialogProgressBar } from '@/components/album/PostFormDialogProgressBar/PostFormDialogProgressBar'
import { FieldMultiSelect } from '@/components/mui/FormFieldMultiSelect/FormFieldMultiSelect'
import { FieldSelect } from '@/components/mui/FormFieldSelect/FormFieldSelect'
import { FieldText } from '@/components/mui/FormFieldText/FormFieldText'
import { PostAudiences } from '@/constants/album'
import { FileInputExtensions } from '@/constants/app'
import {
  useCategories,
  useCreatePost,
  useUpdatePost
} from '@/hooks/useHttpAlbum'
import type { Post, PostForm } from '@/types/album'

interface PostFormDialogProps {
  post?: Post
  closeDialog: () => void
}

export const PostFormDialog: FC<PostFormDialogProps> = ({
  post,
  closeDialog
}) => {
  const isCreating = !post
  const { t } = useTranslation('common')
  const { execute: executeCreate } = useCreatePost()
  const { execute: executeUpdate } = useUpdatePost()
  const { isLoading, categories, isError } = useCategories({ isReady: true })
  const formik = useFormik<PostForm>({
    initialValues: {
      title: post?.title ?? '',
      description: post?.description ?? '',
      audience: post?.audience ?? PostAudiences.ALL,
      categories: (post?.categories ?? []).map((category) => category._id),
      ...(isCreating ? { files: [] } : {})
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .max(25, t('POST_TITLE_MAX_MESSAGE'))
        .required(t('POST_TITLE_REQUIRED_MESSAGE')),
      description: yup.string().max(500, t('POST_DESCRIPTION_MAX_MESSAGE')),
      audience: yup.mixed().oneOf(Object.values(PostAudiences)),
      categories: yup.array(),
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
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)

      if (isCreating) {
        executeCreate(values)
          .then(() => {
            closeDialog()
          })
          .catch(() => {
            setSubmitting(false)
          })
      } else {
        closeDialog()

        executeUpdate(post._id, values)
      }
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
            name="categories"
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

          <PostFormDialogProgressBar />
        </>
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
            disabled={isLoading || isError || formik.isSubmitting}
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
