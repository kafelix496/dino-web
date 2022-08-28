import { PostAudiences } from '@/constants/album'
import { FileExtensions, FileTypes } from '@/constants/app'

export interface PostQueryParamResponse {
  qpPage: number
  qpCategoryId: string | undefined
  qpAssetId: string | undefined
}

export interface PostQueryParamRequest {
  qpPage?: number
  qpCategoryId?: string | null
  qpAssetId?: string | null
}

export interface DrawerMenuItem {
  id: string
  iconComponent: JSX.Element
  label: string
  url: string
  selected: boolean
  editable: boolean
}

export interface AssetDefault {
  _id: string
  key: string
  type: FileTypes
  extension: FileExtensions
  src?: string
  createdAt: string
  updatedAt: string
}

export interface Asset extends AssetDefault {
  siblings: string[]
}

export interface Category {
  _id: string
  name: string
}

export interface PostForm {
  title: string
  description: string
  audience: PostAudiences
  categories: string[]
  files?: File[]
}

export interface PostRequest {
  title: string
  description: string
  audience: PostAudiences
  categories: string[]
  assets?: { key: string; extension: string }[]
}

export interface Post {
  _id: string
  title: string
  description: string
  audience: PostAudiences
  categories: Category[]
  assets: AssetDefault[]
  createdAt: string
  updatedAt: string
}

export interface PostsData {
  total: number
  posts: Post[]
}
