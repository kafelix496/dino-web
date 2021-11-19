import { HYDRATE } from 'next-redux-wrapper'
import { ActionType } from '@/redux-types/theme'

import type { AnyAction } from 'redux'
import type { HydrateAction } from '@/redux-types'
import type { Action, State } from '@/redux-types/theme'

const initialState: State = {
  paletteMode: 'dark'
}

const reducer = (state: State = initialState, action: AnyAction) => {
  const _action = action as Action | HydrateAction

  switch (_action.type) {
    case HYDRATE: {
      return { ...state, ..._action.payload }
    }

    case ActionType.TOGGLE_PALETTE_MODE: {
      return {
        ...state,
        paletteMode: state.paletteMode === 'light' ? 'dark' : 'light'
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
