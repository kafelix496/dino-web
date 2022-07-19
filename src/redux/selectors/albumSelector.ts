import type { RootState } from '@/redux-types'

export const selectCategoryList = (state: RootState) => state.album.categories

export const selectPostData = (state: RootState) => state.album.postData
