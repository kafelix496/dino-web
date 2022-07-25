import nookies from 'nookies'
import type { ThunkAction } from 'redux-thunk'

import { COOKIES_OPTION, Locales, PaletteModes } from '@/constants/app'
import { Cookies } from '@/constants/cookies'
import type { RootState } from '@/redux-types'
import { ActionType } from '@/redux-types/setting'
import type { Action } from '@/redux-types/setting'

export const setPaletteMode = (
  mode: PaletteModes
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    nookies.set(null, Cookies.paletteMode, mode, COOKIES_OPTION)

    dispatch({ type: ActionType.SET_PALETTE_MODE, value: mode })
  }
}

export const setLocale = (
  locale: Locales
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    nookies.set(null, Cookies.locale, locale, COOKIES_OPTION)

    dispatch({ type: ActionType.SET_LOCALE, value: locale })
  }
}
