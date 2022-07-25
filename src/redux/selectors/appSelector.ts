import type { RootState } from '@/redux-types'

export const selectToastMessages = (state: RootState) => state.app.toastMessages
