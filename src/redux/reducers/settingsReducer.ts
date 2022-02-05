import type { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

import type { HydrateAction } from '@/redux-types'
import { ActionType, Locale, PaletteMode } from '@/redux-types/settings'
import type { Action, State } from '@/redux-types/settings'

const initialState: State = {
  paletteMode: PaletteMode.SYSTEM,
  locale: Locale.EN
}

const reducer = (state: State = initialState, action: AnyAction) => {
  const _action = action as Action | HydrateAction

  switch (_action.type) {
    case HYDRATE: {
      return { ...state, ..._action.payload.settings }
    }

    case ActionType.SET_PALETTE_MODE: {
      return {
        ...state,
        paletteMode: action.value
      }
    }

    case ActionType.SET_LOCALE: {
      return {
        ...state,
        locale: action.value
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
