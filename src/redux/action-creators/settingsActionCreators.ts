import type { Dispatch } from 'redux'
import nookies from 'nookies'

import { ActionType, Locale } from '@/redux-types/settings'
import type { Action, PaletteMode } from '@/redux-types/settings'
import { Cookies } from '@/global-constants/cookies'

export const setPaletteMode = (mode: PaletteMode) => {
  return (dispatch: Dispatch<Action>) => {
    nookies.set(null, Cookies.paletteMode, mode, {
      // day hour minute second
      maxAge: 365 * 24 * 60 * 60,
      path: '/'
    })

    dispatch({ type: ActionType.SET_PALETTE_MODE, value: mode })
  }
}

export const setLocale = (locale: Locale) => {
  return (dispatch: Dispatch<Action>) => {
    nookies.set(null, Cookies.locale, locale, {
      // day hour minute second
      maxAge: 365 * 24 * 60 * 60,
      path: '/'
    })

    dispatch({ type: ActionType.SET_LOCALE, value: locale })
  }
}
