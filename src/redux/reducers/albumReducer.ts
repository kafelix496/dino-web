import { HYDRATE } from 'next-redux-wrapper'
import type { AnyAction } from 'redux'

import type { HydrateAction } from '@/redux-types'
import { ActionType } from '@/redux-types/album'
import type { Action, State } from '@/redux-types/album'

const initialState: State = {
  categories: [],
  postData: { total: 0, posts: [] }
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
        categories: _action.categories
      }
    }

    case ActionType.ADD_CATEGORY: {
      return {
        ...state,
        categories: state.categories.concat(_action.category)
      }
    }

    case ActionType.UPDATE_CATEGORY: {
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === _action.id
            ? { ...category, ..._action.category }
            : category
        )
      }
    }

    case ActionType.DELETE_CATEGORY: {
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== _action.id
        )
      }
    }

    case ActionType.SET_POST_DATA: {
      return {
        ...state,
        postData: {
          total: _action.total,
          posts: _action.posts
        }
      }
    }

    case ActionType.ADD_POST: {
      return {
        ...state,
        postData: {
          total: state.postData.total + 1,
          posts: [_action.post].concat(state.postData.posts)
        }
      }
    }

    case ActionType.UPDATE_POST: {
      return {
        ...state,
        postData: {
          ...state.postData,
          posts: state.postData.posts.map((post) =>
            post._id === _action.id ? { ...post, ..._action.post } : post
          )
        }
      }
    }

    case ActionType.DELETE_POST: {
      return {
        ...state,
        postData: {
          total: state.postData.total + 1,
          posts: state.postData.posts.filter((post) => post._id !== _action.id)
        }
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
