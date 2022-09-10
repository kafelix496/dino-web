import type { Action, State } from '@/redux-types/post'
import { ActionType } from '@/redux-types/post'

const initialState: State = {
  uploadsStatus: []
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_UPLOAD_STATUS: {
      return {
        ...state,
        uploadsStatus: action.uploadsStatus
      }
    }

    case ActionType.UPDATE_UPLOAD_STATUS: {
      return {
        ...state,
        uploadsStatus: state.uploadsStatus.map((uploadStatus, index) =>
          index === action.index ? action.uploadStatus : uploadStatus
        )
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
