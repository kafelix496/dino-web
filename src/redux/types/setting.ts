import { Locales, PaletteModes } from '@/constants/app'

export interface State {
  paletteMode: PaletteModes
  locale: Locales
}

export enum ActionType {
  SET_PALETTE_MODE = 'setting/setPaletteMode',
  SET_LOCALE = 'setting/setLocale'
}

export interface setPaletteModeAction {
  type: ActionType.SET_PALETTE_MODE
  value: PaletteModes
}

export interface setLocaleAction {
  type: ActionType.SET_LOCALE
  value: Locales
}

export type Action = setPaletteModeAction | setLocaleAction
