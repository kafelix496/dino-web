import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useSWR, { useSWRConfig } from 'swr'

import { AlertColor } from '@/constants/app'
import albumHttpService from '@/http-services/album'
import { enqueueAlert } from '@/redux-actions'
import type { Category, Post } from '@/types/album'
import { generateUuid } from '@/utils/app'

export const useCategories = () => {
  const { data, error } = useSWR<Category[]>(
    albumHttpService.getCategoriesUrl()
  )

  return {
    isLoading: !data && !error,
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
  page,
  category
}: {
  page: number
  category?: string
}) => {
  const { data, error } = useSWR<{ total: number; posts: Post[] }>(
    albumHttpService.getPostsDataUrl({ page, category })
  )

  return {
    isLoading: !data && !error,
    isError: !!error,
    total: data?.total ?? 0,
    posts: data?.posts ?? []
  }
}
