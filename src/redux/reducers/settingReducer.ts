import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from 'redux'

import { Locale, PaletteMode } from '@/constants'
import type { HydrateAction } from '@/redux-types'
import { ActionType } from '@/redux-types/setting'
import type { Action, State } from '@/redux-types/setting'

const initialState: State = {
  paletteMode: PaletteMode.LIGHT,
  locale: Locale.EN
}

const reducer = (state: State = initialState, action: AnyAction) => {
  const _action = action as Action | HydrateAction

  switch (_action.type) {
    case HYDRATE: {
      return { ...state, ..._action.payload.setting }
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
