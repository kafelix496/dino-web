import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'
import { HydrateAction } from '@/redux-types'
import { Action, ActionType, State } from '../types/todo'

const initialState: State = {
  todos: []
}

const reducer = (state: State = initialState, action: AnyAction) => {
  const _action = action as Action | HydrateAction

  switch (_action.type) {
    case HYDRATE: {
      return { ...state, ..._action.payload }
    }

    case ActionType.ADD_TODO: {
      return {
        ...state,
        todos: state.todos.concat({ _id: '123', title: action.title })
      }
    }

    case ActionType.REMOVE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== _action.id)
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
