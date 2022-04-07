import { Locale, PaletteMode } from '@/constants'

export interface State {
  paletteMode: PaletteMode
  locale: Locale
}

export enum ActionType {
  SET_PALETTE_MODE = 'setting/setPaletteMode',
  SET_LOCALE = 'setting/setLocale'
}

export interface setPaletteModeAction {
  type: ActionType.SET_PALETTE_MODE
  value: PaletteMode
}

export interface setLocaleAction {
  type: ActionType.SET_LOCALE
  value: Locale
}

export type Action = setPaletteModeAction | setLocaleAction
