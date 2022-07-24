import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from 'redux'

import type { HydrateAction } from '@/redux-types'
import { ActionType } from '@/redux-types/app'
import type { Action, State } from '@/redux-types/app'
import { generateUuid } from '@/utils'

const initialState: State = {
  toastMessages: []
}

const reducer = (state: State = initialState, action: AnyAction) => {
  const _action = action as Action | HydrateAction

  switch (_action.type) {
    case HYDRATE: {
      return { ...state, ..._action.payload.album }
    }

    case ActionType.ENQUEUE_ALERT: {
      return {
        ...state,
        toastMessages: state.toastMessages.concat({
          id: generateUuid(),
          severity: _action.severity,
          message: _action.message
        })
      }
    }

    case ActionType.DELETE_ALERT: {
      return {
        ...state,
        toastMessages: state.toastMessages.filter(
          (toastMessage) => toastMessage.id !== _action.id
        )
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
