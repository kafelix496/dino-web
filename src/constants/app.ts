export const DRAWER_WIDTH = 280

export const COOKIES_OPTION = {
  // day hour minute second
  maxAge: 365 * 24 * 60 * 60,
  path: '/'
}

export enum PaletteModes {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Locales {
  EN = 'en',
  KR = 'kr'
}

export enum AccessLevels {
  NONE = '0',
  VIEWER = '1',
  COMMENTOR = '2',
  EDITOR = '5',
  ADMIN = '9',
  SUPER_ADMIN = '10'
}

// NOTE: 496-1
export enum Apps {
  familyAlbum = 'fa',
  moneyTracker = 'mt'
}

export enum AlertColor {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}
