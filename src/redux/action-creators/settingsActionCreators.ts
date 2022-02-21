import type { Dispatch } from 'redux'
import nookies from 'nookies'

import { ActionType, Locale } from '@/redux-types/settings'
import type { Action, PaletteMode } from '@/redux-types/settings'
import { Cookies } from '@/constants/cookies'
import { COOKIES_OPTION } from '@/constants'

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
