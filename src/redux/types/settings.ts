export enum PaletteMode {
  LIGHT = 'light',
  SYSTEM = 'system',
  DARK = 'dark'
}

export enum Locale {
  EN = 'en',
  KR = 'kr'
}

export interface State {
  paletteMode: PaletteMode
  locale: Locale
}

export enum ActionType {
  SET_PALETTE_MODE = 'settings/setPaletteMode',
  SET_LOCALE = 'settings/setLocale'
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
