import axios from 'axios'

import { Apps } from '@/constants/app'
import type { AxiosRequestConfig } from '@/types'
import type {
  Asset,
  AssetDefault,
  Category,
  Post,
  PostRaw,
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
  getPostsDataUrl(data: { page: number; category?: string }) {
    return (
      `${process.env.PAGE_URL ?? ''}/api/app/${
        Apps.familyAlbum
      }/album/post?page=${data.page}` +
      (data.category ? `&category=${data.category}` : '')
    )
  },
  async getPostsData(
    data: {
      page: number
      category?: string
    },
    config?: AxiosRequestConfig
  ): Promise<{ total: number; posts: Post[] }> {
    return axios
      .get<{ total: number; posts: Post[] }>(
        this.getPostsDataUrl({ page: data.page }),
        config
      )
      .then((res) => res.data)
  },
  async createPost(
    data: {
      values: PostRequest
    },
    config?: AxiosRequestConfig
  ): Promise<{ post: PostRaw; assets: AssetDefault[] }> {
    return axios
      .post<{ post: PostRaw; assets: AssetDefault[] }>(
        `${process.env.PAGE_URL ?? ''}/api/app/${Apps.familyAlbum}/album/post`,
        data.values,
        config
      )
      .then((res) => res.data)
  },
  async updatePost(
    data: {
      id: string
      values: PostRequest
    },
    config?: AxiosRequestConfig
  ): Promise<PostRaw> {
    return axios
      .put<PostRaw>(
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
  ): Promise<PostRaw> {
    return axios
      .delete<PostRaw>(
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
