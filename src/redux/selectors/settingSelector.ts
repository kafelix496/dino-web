import type { RootState } from '@/redux-types'

export const selectPaletteMode = (state: RootState) => state.setting.paletteMode

export const selectLocale = (state: RootState) => state.setting.locale
