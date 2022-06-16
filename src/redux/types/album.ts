import type { Category } from '@/types/album'

export interface State {
  categories: Category[]
}

export enum ActionType {
  SET_CATEGORIES = 'familyAlbum/setCategories',
  ADD_CATEGORY = 'familyAlbum/addCategory',
  EDIT_CATEGORY = 'familyAlbum/editCategory',
  DELETE_CATEGORY = 'familyAlbum/deleteCategory'
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

export type Action =
  | setCategoriesAction
  | addCategoryAction
  | editCategoryAction
  | deleteCategoryAction
