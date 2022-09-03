import nookies from 'nookies'
import type { ThunkAction } from 'redux-thunk'

import { AlertColor, COOKIES_OPTION } from '@/constants/app'
import { Cookies } from '@/constants/cookies'
import { selectSidebarNavOpenStatus } from '@/redux-selectors'
import type { RootState } from '@/redux-types'
import { ActionType } from '@/redux-types/app'
import type { Action } from '@/redux-types/app'

export const showGlobalLoading = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action
> => {
  return (dispatch) => {
    dispatch({ type: ActionType.SET_LOADING, status: true })
  }
}

export const hideGlobalLoading = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action
> => {
  return (dispatch) => {
    dispatch({ type: ActionType.SET_LOADING, status: false })
  }
}

export const enqueueAlert = (
  severity: AlertColor,
  message: string
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.ENQUEUE_ALERT, severity, message })
  }
}

export const deleteAlert = (
  id: string
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.DELETE_ALERT, id })
  }
}

export const setSidebarNavOpenStatus = (
  status: boolean
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    nookies.set(null, Cookies.sidebarNav, String(status), COOKIES_OPTION)

    dispatch({ type: ActionType.UPDATE_SIDEBAR_NAV_OPEN_STATUS, status })
  }
}

export const toggleSidebarNavOpenStatus = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action
> => {
  return (dispatch, getState) => {
    const isSidebarNavOpen = selectSidebarNavOpenStatus(getState())

    nookies.set(
      null,
      Cookies.sidebarNav,
      String(!isSidebarNavOpen),
      COOKIES_OPTION
    )

    dispatch({ type: ActionType.TOGGLE_SIDEBAR_NAV_OPEN_STATUS })
  }
}

export const setSettingNavOpenStatus = (
  status: boolean
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.UPDATE_SETTING_NAV_OPEN_STATUS, status })
  }
}
