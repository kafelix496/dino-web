import type { Category, Post } from '@/types/album'

export interface State {
  categories: Category[]
  postData: { total: number; posts: Post[] }
}

export enum ActionType {
  SET_CATEGORIES = 'familyAlbum/setCategories',
  ADD_CATEGORY = 'familyAlbum/addCategory',
  UPDATE_CATEGORY = 'familyAlbum/updateCategory',
  DELETE_CATEGORY = 'familyAlbum/deleteCategory',
  SET_POST_DATA = 'familyAlbum/setPostData',
  ADD_POST = 'familyAlbum/addPost',
  UPDATE_POST = 'familyAlbum/updatePost',
  DELETE_POST = 'familyAlbum/deletePost'
}

export interface setCategoriesAction {
  type: ActionType.SET_CATEGORIES
  categories: Category[]
}

export interface addCategoryAction {
  type: ActionType.ADD_CATEGORY
  category: Category
}

export interface updateCategoryAction {
  type: ActionType.UPDATE_CATEGORY
  id: string
  category: Pick<Category, 'name'>
}

export interface deleteCategoryAction {
  type: ActionType.DELETE_CATEGORY
  id: string
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
  post: Partial<Omit<Post, '_id'>>
}

export interface deletePostAction {
  type: ActionType.DELETE_POST
  id: string
}

export type Action =
  | setCategoriesAction
  | addCategoryAction
  | updateCategoryAction
  | deleteCategoryAction
  | setPostDataAction
  | addPostAction
  | updatePostAction
  | deletePostAction
