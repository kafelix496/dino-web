import type { Dispatch } from 'redux'

import { ActionType } from '@/redux-types/user'
import type { Action } from '@/redux-types/user'
import type { User } from '@/types'

export const setUser = (user: User | null) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_USER, user })
  }
}
