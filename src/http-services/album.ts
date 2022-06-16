import axios from 'axios'

import { Apps } from '@/constants'
import type { AxiosRequestConfig } from '@/types'
import type { Category } from '@/types/album'

const albumHttpService = {
  getCategories: (config?: AxiosRequestConfig): Promise<Category[]> =>
    axios
      .get<Category[]>(
        `${process.env.PAGE_URL ?? ''}/api/app/${
          Apps.familyAlbum
        }/album/category`,
        config
      )
      .then((res) => res.data),
  createCategory: (
    data: {
      values: Pick<Category, 'name'>
    },
    config?: AxiosRequestConfig
  ): Promise<Category> =>
    axios
      .post<Category>(
        `${process.env.PAGE_URL ?? ''}/api/app/${
          Apps.familyAlbum
        }/album/category`,
        data.values,
        config
      )
      .then((res) => res.data),
  editCategory: (
    data: {
      id: string
      values: Pick<Category, 'name'>
    },
    config?: AxiosRequestConfig
  ): Promise<Category> =>
    axios
      .put<Category>(
        `/api/app/${Apps.familyAlbum}/album/category/${data.id}`,
        data.values,
        config
      )
      .then((res) => res.data),
  deleteCategory: (
    data: {
      id: string
    },
    config?: AxiosRequestConfig
  ): Promise<void> =>
    axios
      .delete(`/api/app/${Apps.familyAlbum}/album/category/${data.id}`, config)
      .then(() => undefined)
}

export default albumHttpService
