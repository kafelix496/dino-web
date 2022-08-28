import axios from 'axios'

import { Apps } from '@/constants/app'
import type { AxiosRequestConfig } from '@/types'
import type {
  Asset,
  Category,
  Post,
  PostForm,
  PostRequest
} from '@/types/album'

const albumHttpService = {
  getCategoriesUrl() {
    return `${process.env.PAGE_URL ?? ''}/api/app/${
      Apps.familyAlbum
    }/album/category`
  },
  async getCategories(config?: AxiosRequestConfig): Promise<Category[]> {
    return axios
      .get<Category[]>(this.getCategoriesUrl(), config)
      .then((res) => res.data)
  },
  async createCategory(
    data: {
      values: Pick<Category, 'name'>
    },
    config?: AxiosRequestConfig
  ): Promise<Category> {
    return axios
      .post<Category>(
        `${process.env.PAGE_URL ?? ''}/api/app/${
          Apps.familyAlbum
        }/album/category`,
        data.values,
        config
      )
      .then((res) => res.data)
  },
  async updateCategory(
    data: {
      id: string
      values: Omit<Category, '_id'>
    },
    config?: AxiosRequestConfig
  ): Promise<Category> {
    return axios
      .put<Category>(
        `${process.env.PAGE_URL ?? ''}/api/app/${
          Apps.familyAlbum
        }/album/category/${data.id}`,
        data.values,
        config
      )
      .then((res) => res.data)
  },
  async deleteCategory(
    data: {
      id: string
    },
    config?: AxiosRequestConfig
  ): Promise<Category> {
    return axios
      .delete<Category>(
        `${process.env.PAGE_URL ?? ''}/api/app/${
          Apps.familyAlbum
        }/album/category/${data.id}`,
        config
      )
      .then((res) => res.data)
  },
  getPostsDataUrl(data: { qpPage: number; qpCategoryId?: string }) {
    return (
      `${process.env.PAGE_URL ?? ''}/api/app/${
        Apps.familyAlbum
      }/album/post?qpPage=${data.qpPage}` +
      (data.qpCategoryId ? `&qpCategoryId=${data.qpCategoryId}` : '')
    )
  },
  async getPostsData(
    data: {
      qpPage: number
      category?: string
    },
    config?: AxiosRequestConfig
  ): Promise<{ total: number; posts: Post[] }> {
    return axios
      .get<{ total: number; posts: Post[] }>(
        this.getPostsDataUrl({ qpPage: data.qpPage }),
        config
      )
      .then((res) => res.data)
  },
  async createPost(
    data: {
      values: PostRequest
    },
    config?: AxiosRequestConfig
  ): Promise<Post> {
    return axios
      .post<Post>(
        `${process.env.PAGE_URL ?? ''}/api/app/${Apps.familyAlbum}/album/post`,
        data.values,
        config
      )
      .then((res) => res.data)
  },
  async updatePost(
    data: {
      id: string
      values: PostForm
    },
    config?: AxiosRequestConfig
  ): Promise<Post> {
    return axios
      .put<Post>(
        `${process.env.PAGE_URL ?? ''}/api/app/${Apps.familyAlbum}/album/post/${
          data.id
        }`,
        data.values,
        config
      )
      .then((res) => res.data)
  },
  async deletePost(
    data: {
      id: string
    },
    config?: AxiosRequestConfig
  ): Promise<Post> {
    return axios
      .delete<Post>(
        `${process.env.PAGE_URL ?? ''}/api/app/${Apps.familyAlbum}/album/post/${
          data.id
        }`,
        config
      )
      .then((res) => res.data)
  },
  async getAsset(
    data: {
      id: string
    },
    config?: AxiosRequestConfig
  ): Promise<Asset> {
    return axios
      .get<Asset>(
        `${process.env.PAGE_URL ?? ''}/api/app/${
          Apps.familyAlbum
        }/album/asset/${data.id}`,
        config
      )
      .then((res) => res.data)
  }
}

export default albumHttpService
