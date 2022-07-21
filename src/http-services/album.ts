import axios from 'axios'

import { Apps } from '@/constants'
import type { AxiosRequestConfig } from '@/types'
import type { Category, Post, PostRequest } from '@/types/album'

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
        `${process.env.PAGE_URL ?? ''}/api/app/${
          Apps.familyAlbum
        }/album/category/${data.id}`,
        data.values,
        config
      )
      .then((res) => res.data),
  deleteCategory: (
    data: {
      id: string
    },
    config?: AxiosRequestConfig
  ): Promise<Category> =>
    axios
      .delete<Category>(
        `${process.env.PAGE_URL ?? ''}/api/app/${
          Apps.familyAlbum
        }/album/category/${data.id}`,
        config
      )
      .then((res) => res.data),
  getPosts: (
    data: {
      page: number
      category?: string
    },
    config?: AxiosRequestConfig
  ): Promise<{ total: number; posts: Post[] }> =>
    axios
      .get<{ total: number; posts: Post[] }>(
        `${process.env.PAGE_URL ?? ''}/api/app/${
          Apps.familyAlbum
        }/album/post?page=${data.page}` +
          (data.category ? `&category=${data.category}` : ''),
        config
      )
      .then((res) => res.data),
  createPost: (
    data: {
      values: PostRequest
    },
    config?: AxiosRequestConfig
  ): Promise<Post> =>
    axios
      .post<Post>(
        `${process.env.PAGE_URL ?? ''}/api/app/${Apps.familyAlbum}/album/post`,
        data.values,
        config
      )
      .then((res) => res.data),
  deletePost: (
    data: {
      id: string
    },
    config?: AxiosRequestConfig
  ): Promise<Post> =>
    axios
      .delete<Post>(
        `${process.env.PAGE_URL ?? ''}/api/app/${Apps.familyAlbum}/album/post/${
          data.id
        }`,
        config
      )
      .then((res) => res.data)
}

export default albumHttpService
