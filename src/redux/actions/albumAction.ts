import type { ThunkAction } from 'redux-thunk'

import { selectCategory } from '@/redux-selectors'
import type { RootState } from '@/redux-types'
import { ActionType } from '@/redux-types/album'
import type { Action } from '@/redux-types/album'
import type {
  AssetDefault,
  Category,
  Comment,
  Post,
  PostRaw
} from '@/types/album'
import { getDefaultReaction } from '@/utils/album'

export const setCategories = (
  categories: Category[]
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.SET_CATEGORIES, categories })
  }
}

export const addCategory = (
  category: Category
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.ADD_CATEGORY, category })
  }
}

export const editCategory = (
  id: string,
  category: Category | Pick<Category, 'name'>
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.EDIT_CATEGORY, id, category })
  }
}

export const deleteCategory = (
  id: string
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.DELETE_CATEGORY, id })
  }
}

export const setPostData = (
  total: number,
  posts: Post[]
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.SET_POST_DATA, total, posts })
  }
}

export const addPost = (
  post: PostRaw,
  assets: AssetDefault[]
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch, getState) => {
    const rootState = getState()

    dispatch({
      type: ActionType.ADD_POST,
      post: {
        ...post,
        assets: post.assets
          .map((assetId) => assets.find((asset) => asset._id === assetId))
          .filter((asset) => asset !== undefined) as AssetDefault[],
        categories: post.categories
          .map((categoryId) => selectCategory(categoryId, rootState))
          .filter((category) => category !== undefined) as Category[],
        reaction: {
          _id: null,
          status: null,
          items: getDefaultReaction()
        },
        comments: [] as Comment[]
      }
    })
  }
}

export const deletePost = (
  id: string
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.DELETE_POST, id })
  }
}
