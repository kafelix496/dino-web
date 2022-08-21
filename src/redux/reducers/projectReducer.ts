import { ActionType } from '@/redux-types/project'
import type { Action, State } from '@/redux-types/project'

const initialState: State = {
  projects: []
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
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
