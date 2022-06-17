import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from 'redux'

import type { HydrateAction } from '@/redux-types'
import { ActionType } from '@/redux-types/album'
import type { Action, State } from '@/redux-types/album'

const initialState: State = {
  categories: []
}

const reducer = (state: State = initialState, action: AnyAction) => {
  const _action = action as Action | HydrateAction

  switch (_action.type) {
    case HYDRATE: {
      return { ...state, ..._action.payload.album }
    }

    case ActionType.SET_CATEGORIES: {
      return {
        ...state,
        categories: action.categories
      }
    }

    case ActionType.ADD_CATEGORY: {
      return {
        ...state,
        categories: state.categories.concat(action.category)
      }
    }

    case ActionType.EDIT_CATEGORY: {
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.id
            ? { ...category, ...action.category }
            : category
        )
      }
    }

    case ActionType.DELETE_CATEGORY: {
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.id
        )
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
