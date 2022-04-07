import nookies from 'nookies'
import type { Dispatch } from 'redux'

import { COOKIES_OPTION, Locale, PaletteMode } from '@/constants'
import { Cookies } from '@/constants/cookies'
import { ActionType } from '@/redux-types/setting'
import type { Action } from '@/redux-types/setting'

export const setPaletteMode = (mode: PaletteMode) => {
  return (dispatch: Dispatch<Action>) => {
    nookies.set(null, Cookies.paletteMode, mode, COOKIES_OPTION)

    dispatch({ type: ActionType.SET_PALETTE_MODE, value: mode })
  }
}

export const setLocale = (locale: Locale) => {
  return (dispatch: Dispatch<Action>) => {
    nookies.set(null, Cookies.locale, locale, COOKIES_OPTION)

    dispatch({ type: ActionType.SET_LOCALE, value: locale })
  }
}
