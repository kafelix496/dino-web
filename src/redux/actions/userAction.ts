import type { ThunkAction } from 'redux-thunk'

import type { RootState } from '@/redux-types'
import { ActionType } from '@/redux-types/user'
import type { Action } from '@/redux-types/user'
import type { User } from '@/types'

export const setUser = (
  user: User | null
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.SET_USER, user })
  }
}
