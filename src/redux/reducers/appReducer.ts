import { ActionType } from '@/redux-types/app'
import type { Action, State } from '@/redux-types/app'
import { generateUuid } from '@/utils/app'

const initialState: State = {
  toastMessages: [],
  isSidebarNavOpen: false,
  isSettingNavOpen: false
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.ENQUEUE_ALERT: {
      return {
        ...state,
        toastMessages: state.toastMessages.concat({
          id: generateUuid(),
          severity: action.severity,
          message: action.message
        })
      }
    }

    case ActionType.DELETE_ALERT: {
      return {
        ...state,
        toastMessages: state.toastMessages.filter(
          (toastMessage) => toastMessage.id !== action.id
        )
      }
    }

    case ActionType.UPDATE_SIDEBAR_NAV_OPEN_STATUS: {
      return {
        ...state,
        isSidebarNavOpen: action.status
      }
    }

    case ActionType.TOGGLE_SIDEBAR_NAV_OPEN_STATUS: {
      return {
        ...state,
        isSidebarNavOpen: !state.isSidebarNavOpen
      }
    }

    case ActionType.UPDATE_SETTING_NAV_OPEN_STATUS: {
      return {
        ...state,
        isSettingNavOpen: action.status
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
