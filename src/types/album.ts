import type { User } from '@/types'

export interface Like {
  total: number
  clicked: boolean
  users: Pick<User, 'name' | 'email'>[]
}

export interface Comment {
  _id: string
  content: string
}

export interface AssetDefault {
  _id: string
  key: string
}

export interface Asset extends AssetDefault {
  like: Like[]
  comments: Comment[]
}

export interface Category {
  _id: string
  name: string
}

export interface Post {
  _id: string
  categories: Category[]
  like: Like
  assets: AssetDefault[]
  comments: Comment[]
}
