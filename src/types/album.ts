import { PostAudiences, Reactions } from '@/constants/album'
import { CollectionsName } from '@/constants/collection'

export interface ReactionResponse {
  _id: string
  parent:
    | CollectionsName.ALBUM_ASSET
    | CollectionsName.ALBUM_POST
    | CollectionsName.ALBUM_COMMENT
  parentId: string
  user: string
  status: Reactions
}

export interface Reaction {
  _id: string | null
  status: Reactions | null
  items: [
    { type: Reactions.LIKE; total: number },
    { type: Reactions.LOVE; total: number },
    { type: Reactions.HAHA; total: number },
    { type: Reactions.WOW; total: number },
    { type: Reactions.SAD; total: number },
    { type: Reactions.ANGRY; total: number }
  ]
}

export interface CommentResponse {
  _id: string
  parent: CollectionsName.ALBUM_ASSET | CollectionsName.ALBUM_POST
  parentId: string
  user: string
  content: string
}

export interface Comment {
  _id: string
  content: string
  createdAt: string
  updatedAt: string
  reaction: Reaction
}

export interface AssetDefault {
  _id: string
  key: string
  extension: string
  src?: string
  createdAt: string
  updatedAt: string
}

export interface Asset extends AssetDefault {
  reaction: Reaction
  comments: Comment[]
}

export interface Category {
  _id: string
  name: string
}

export interface PostRequest {
  assets: { key: string; extension: string }[]
  audience: PostAudiences
  categoriesId?: string[]
  title: string
  description?: string
}

export interface Post {
  _id: string
  audience: PostAudiences
  categories: Category[]
  assets: AssetDefault[]
  reaction: Reaction
  comments: Comment[]
  title: string
  description: string
  createdAt: string
  updatedAt: string
}
