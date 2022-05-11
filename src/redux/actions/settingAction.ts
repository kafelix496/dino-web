import nookies from 'nookies'
import type { Dispatch } from 'redux'

import { COOKIES_OPTION, Locales, PaletteModes } from '@/constants'
import { Cookies } from '@/constants/cookies'
import { ActionType } from '@/redux-types/setting'
import type { Action } from '@/redux-types/setting'

export const setPaletteMode = (mode: PaletteModes) => {
  return (dispatch: Dispatch<Action>) => {
    nookies.set(null, Cookies.paletteMode, mode, COOKIES_OPTION)

    dispatch({ type: ActionType.SET_PALETTE_MODE, value: mode })
  }
}

export const setLocale = (locale: Locales) => {
  return (dispatch: Dispatch<Action>) => {
    nookies.set(null, Cookies.locale, locale, COOKIES_OPTION)

    dispatch({ type: ActionType.SET_LOCALE, value: locale })
  }
}
