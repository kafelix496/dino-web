import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useSWR, { useSWRConfig } from 'swr'

import { AlertColor, S3Paths } from '@/constants/app'
import albumHttpService from '@/http-services/album'
import { enqueueAlert } from '@/redux-actions'
import type { Category, Post, PostForm, PostsData } from '@/types/album'
import { generateUuid } from '@/utils/app'
import { deleteFilesObject, uploadFile } from '@/utils/file'

import { usePostPageQueryParams } from './usePostPageQueryParams'

export const useCategories = ({ isReady }: { isReady: boolean }) => {
  const { data, error } = useSWR<Category[]>(
    isReady ? albumHttpService.getCategoriesUrl() : null
  )

  return {
    isLoading: data === undefined && error !== undefined,
    isError: !!error,
    categories: data ?? []
  }
}

export const useCreateCategory = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const { mutate } = useSWRConfig()

  const execute = useCallback(
    async (values: Omit<Category, '_id'>) => {
      const getNewCategories = (
        newCategory: Category,
        categories: Category[]
      ): Category[] => categories.concat(newCategory)

      return mutate(
        albumHttpService.getCategoriesUrl(),
        albumHttpService.createCategory({ values }),
        {
          optimisticData: (categories: Category[]) => {
            const uuid = generateUuid()

            return getNewCategories({ _id: uuid, ...values }, categories)
          },
          populateCache: (category: Category, categories: Category[]) => {
            return getNewCategories(category, categories)
          },
          rollbackOnError: true
        }
      ).catch((error) => {
        dispatch(enqueueAlert(AlertColor.ERROR, t('ERROR_ALERT_MESSAGE')))

        throw error
      })
    },
    [mutate, dispatch, t]
  )

  return { execute }
}

export const useUpdateCategory = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const { mutate } = useSWRConfig()

  const execute = useCallback(
    async (id: string, values: Omit<Category, '_id'>) => {
      const getNewCategories = (categories: Category[]): Category[] =>
        categories.map((category) =>
          category._id === id ? { ...category, ...values } : category
        )

      return mutate(
        albumHttpService.getCategoriesUrl(),
        albumHttpService.updateCategory({ id, values }),
        {
          optimisticData: (categories: Category[]) => {
            return getNewCategories(categories)
          },
          populateCache: (_, categories: Category[]) => {
            return getNewCategories(categories)
          },
          rollbackOnError: true
        }
      ).catch((error) => {
        dispatch(enqueueAlert(AlertColor.ERROR, t('ERROR_ALERT_MESSAGE')))

        throw error
      })
    },
    [mutate, dispatch, t]
  )

  return { execute }
}

export const useDeleteCategory = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const { mutate } = useSWRConfig()

  const execute = useCallback(
    async (id: string) => {
      const getNewCategories = (categories: Category[]): Category[] =>
        categories.filter((category) => category._id !== id)

      return mutate(
        albumHttpService.getCategoriesUrl(),
        albumHttpService.deleteCategory({ id }),
        {
          optimisticData: (categories: Category[]) => {
            return getNewCategories(categories)
          },
          populateCache: (_, categories: Category[]) => {
            return getNewCategories(categories)
          },
          rollbackOnError: true
        }
      ).catch((error) => {
        dispatch(enqueueAlert(AlertColor.ERROR, t('ERROR_ALERT_MESSAGE')))

        throw error
      })
    },
    [mutate, dispatch, t]
  )

  return { execute }
}

export const usePostsData = ({
  isReady,
  qpPage,
  qpCategoryId
}: {
  isReady: boolean
  qpPage: number
  qpCategoryId?: string
}) => {
  const { data, error } = useSWR<{ total: number; posts: Post[] }>(
    isReady ? albumHttpService.getPostsDataUrl({ qpPage, qpCategoryId }) : null
  )

  return {
    isLoading: data === undefined && error !== undefined,
    isError: !!error,
    total: data?.total ?? 0,
    posts: data?.posts ?? []
  }
}

export const useCreatePost = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const { postPageQueryParams } = usePostPageQueryParams()
  const { mutate } = useSWRConfig()

  const execute = useCallback(
    async (values: PostForm) => {
      return mutate(
        albumHttpService.getPostsDataUrl({
          qpPage: postPageQueryParams.qpPage,
          qpCategoryId: postPageQueryParams.qpCategoryId
        }),
        Promise.all(
          Array.from(values.files!).map((file) =>
            uploadFile(file, S3Paths.ALBUM)
          )
        ).then((uploadedFiles) =>
          albumHttpService
            .createPost({
              values: {
                title: values.title,
                description: values.description,
                audience: values.audience,
                categories: values.categories,
                assets: uploadedFiles
              }
            })
            .catch((error) => {
              // if something wrong on the database,
              // delete all files uploaded
              deleteFilesObject(uploadedFiles.map((file) => file.key))

              throw error
            })
        ),
        {
          populateCache: (newPost: Post, postsData: PostsData) => {
            return {
              total: postsData.total,
              posts: postsData.posts.map((post) =>
                post._id === newPost._id ? newPost : post
              )
            }
          }
        }
      ).catch((error) => {
        dispatch(enqueueAlert(AlertColor.ERROR, t('ERROR_ALERT_MESSAGE')))

        throw error
      })
    },
    [mutate, dispatch, t, postPageQueryParams]
  )

  return { execute }
}

export const useUpdatePost = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const { postPageQueryParams } = usePostPageQueryParams()
  const { mutate } = useSWRConfig()

  const execute = useCallback(
    async (id: string, values: PostForm) => {
      return mutate(
        albumHttpService.getPostsDataUrl({
          qpPage: postPageQueryParams.qpPage,
          qpCategoryId: postPageQueryParams.qpCategoryId
        }),
        albumHttpService.updatePost({ id, values }),
        {
          optimisticData: (postsData: PostsData) => {
            return {
              total: postsData.total,
              posts: postsData.posts.map((post) =>
                post._id === id
                  ? {
                      ...post,
                      title: values.title,
                      description: values.description,
                      audience: values.audience,
                      categories: values.categories
                    }
                  : post
              )
            }
          },
          populateCache: (newPost: Post, postsData: PostsData) => {
            return {
              total: postsData.total,
              posts: postsData.posts.map((post) =>
                post._id === id ? newPost : post
              )
            }
          },
          rollbackOnError: true
        }
      ).catch((error) => {
        dispatch(enqueueAlert(AlertColor.ERROR, t('ERROR_ALERT_MESSAGE')))

        throw error
      })
    },
    [mutate, dispatch, t, postPageQueryParams]
  )

  return { execute }
}

export const useDeletePost = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const { postPageQueryParams } = usePostPageQueryParams()
  const { mutate } = useSWRConfig()

  const execute = useCallback(
    async (id: string, assetKeys: string[]) => {
      const getNewPostsData = (postsData: PostsData): PostsData => ({
        total: postsData.total - 1,
        posts: postsData.posts.filter((post) => post._id !== id)
      })

      return mutate(
        albumHttpService.getPostsDataUrl({
          qpPage: postPageQueryParams.qpPage,
          qpCategoryId: postPageQueryParams.qpCategoryId
        }),
        albumHttpService.deletePost({ id }).then((post) => {
          deleteFilesObject(assetKeys)

          return post
        }),
        {
          optimisticData: (postsData: PostsData) => {
            return getNewPostsData(postsData)
          },
          populateCache: (_, postsData: PostsData) => {
            return getNewPostsData(postsData)
          },
          rollbackOnError: true
        }
      ).catch((error) => {
        dispatch(enqueueAlert(AlertColor.ERROR, t('ERROR_ALERT_MESSAGE')))

        throw error
      })
    },
    [mutate, dispatch, t, postPageQueryParams]
  )

  return { execute }
}
