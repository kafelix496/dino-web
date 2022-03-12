export const DRAWER_WIDTH = 280

export const COOKIES_OPTION = {
  // day hour minute second
  maxAge: 365 * 24 * 60 * 60,
  path: '/'
}

export enum AccessLevels {
  NONE = '0',
  VIEWER = '4',
  COMMENTOR = '5',
  EDITOR = '6',
  GROUP_ADMIN = '8',
  ADMIN = '9',
  SUPER_ADMIN = '10'
}

export enum Apps {
  moneyTracker = 'mt',
  familyAlbum = 'fa'
}
