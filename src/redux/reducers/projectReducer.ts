import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from 'redux'

import type { HydrateAction } from '@/redux-types'
import { ActionType } from '@/redux-types/project'
import type { Action, State } from '@/redux-types/project'

const initialState: State = {
  projects: []
}

const reducer = (state: State = initialState, action: AnyAction) => {
  const _action = action as Action | HydrateAction

  switch (_action.type) {
    case HYDRATE: {
      return { ...state, ..._action.payload.project }
    }

    case ActionType.SET_PROJECTS: {
      return {
        ...state,
        projects: action.projects
      }
    }

    case ActionType.ADD_PROJECT: {
      return {
        ...state,
        projects: state.projects.concat(action.project)
      }
    }

    case ActionType.UPDATE_PROJECT: {
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.id
            ? { ...project, ...action.project }
            : project
        )
      }
    }

    case ActionType.DELETE_PROJECT: {
      return {
        ...state,
        projects: state.projects.filter((project) => project._id !== action.id)
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
