import type { Category, Post } from '@/types/album'

export interface State {
  categories: Category[]
  postData: { total: number; posts: Post[] }
}

export enum ActionType {
  SET_CATEGORIES = 'familyAlbum/setCategories',
  SET_POST_DATA = 'familyAlbum/setPostData',
  ADD_POST = 'familyAlbum/addPost',
  UPDATE_POST = 'familyAlbum/updatePost'
}

export interface setCategoriesAction {
  type: ActionType.SET_CATEGORIES
  categories: Category[]
}

export interface setPostDataAction {
  type: ActionType.SET_POST_DATA
  total: number
  posts: Post[]
}

export interface addPostAction {
  type: ActionType.ADD_POST
  post: Post
}

export interface updatePostAction {
  type: ActionType.UPDATE_POST
  id: string
  post: Post | Partial<Omit<Post, '_id'>>
}

export type Action =
  | setCategoriesAction
  | setPostDataAction
  | addPostAction
  | updatePostAction
