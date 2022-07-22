import type { RootState } from '@/redux-types'

export const selectCategory = (categoryId: string, state: RootState) =>
  state.album.categories.find((category) => category._id === categoryId)

export const selectCategoryList = (state: RootState) => state.album.categories

export const selectPostData = (state: RootState) => state.album.postData
