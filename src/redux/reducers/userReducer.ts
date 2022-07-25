import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from 'redux'

import type { HydrateAction } from '@/redux-types'
import { ActionType } from '@/redux-types/user'
import type { Action, State } from '@/redux-types/user'

const initialState: State = {
  user: null
}

const reducer = (state: State = initialState, action: AnyAction) => {
  const _action = action as Action | HydrateAction

  switch (_action.type) {
    case HYDRATE: {
      return { ...state, ..._action.payload.user }
    }

    case ActionType.SET_USER: {
      return {
        ...state,
        user: _action.user
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
