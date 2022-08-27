import type { ThunkAction } from 'redux-thunk'

import { selectCategory, selectPostData } from '@/redux-selectors'
import type { RootState } from '@/redux-types'
import { ActionType } from '@/redux-types/album'
import type { Action } from '@/redux-types/album'
import type { AssetDefault, Category, Post, PostRaw } from '@/types/album'

export const setCategories = (
  categories: Category[]
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.SET_CATEGORIES, categories })
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
          .filter((category) => category !== undefined) as Category[]
      }
    })
  }
}

export const updatePost = (
  id: string,
  post: PostRaw
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch, getState) => {
    const rootState = getState()

    const originalPost = selectPostData(rootState).posts.find(
      (post) => post._id === id
    )!

    dispatch({
      type: ActionType.UPDATE_POST,
      id,
      post: {
        ...originalPost,
        categories: post.categories
          .map((categoryId) => selectCategory(categoryId, rootState))
          .filter((category) => category !== undefined) as Category[],
        audience: post.audience,
        title: post.title,
        description: post.description
      }
    })
  }
}
