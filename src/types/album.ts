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
