import type { RootState } from '@/redux-types'

export const selectGlobalLoadingState = (state: RootState) =>
  state.app.isLoading

export const selectToastMessages = (state: RootState) => state.app.toastMessages

export const selectSidebarNavOpenStatus = (state: RootState) =>
  state.app.isSidebarNavOpen

export const selectSettingNavOpenStatus = (state: RootState) =>
  state.app.isSettingNavOpen
