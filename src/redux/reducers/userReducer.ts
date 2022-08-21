import { ActionType } from '@/redux-types/user'
import type { Action, State } from '@/redux-types/user'

const initialState: State = {
  user: null
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_USER: {
      return {
        ...state,
        user: action.user
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
