import type { RootState } from '@/redux-types'

export const selectCategoryList = (state: RootState) => state.album.categories
