import type { RootState } from '@/redux-types'

export const selectUser = (state: RootState) => state.user.user
