import type { ThunkAction } from 'redux-thunk'

import type { RootState } from '@/redux-types'
import { ActionType } from '@/redux-types/app'
import type { Action } from '@/redux-types/app'

export const enqueueAlert = (
  severity: string,
  message: string
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.ENQUEUE_ALERT, severity, message })
  }
}
