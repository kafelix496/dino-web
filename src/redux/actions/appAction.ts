import type { ThunkAction } from 'redux-thunk'

import { AlertColor } from '@/constants/app'
import type { RootState } from '@/redux-types'
import { ActionType } from '@/redux-types/app'
import type { Action } from '@/redux-types/app'

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
