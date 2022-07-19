import type { Category, Post } from '@/types/album'

export interface State {
  categories: Category[]
  postData: { total: number; posts: Post[] }
}

export enum ActionType {
  SET_CATEGORIES = 'familyAlbum/setCategories',
  ADD_CATEGORY = 'familyAlbum/addCategory',
  EDIT_CATEGORY = 'familyAlbum/editCategory',
  DELETE_CATEGORY = 'familyAlbum/deleteCategory',
  SET_POST_DATA = 'familyAlbum/setPostData',
  ADD_POST = 'familyAlbum/addPost'
}

export interface setCategoriesAction {
  type: ActionType.SET_CATEGORIES
  categories: Category[]
}

export interface addCategoryAction {
  type: ActionType.ADD_CATEGORY
  category: Category
}

export interface editCategoryAction {
  type: ActionType.EDIT_CATEGORY
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

export type Action =
  | setCategoriesAction
  | addCategoryAction
  | editCategoryAction
  | deleteCategoryAction
  | setPostDataAction
  | addPostAction
