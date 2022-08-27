import { ActionType } from '@/redux-types/album'
import type { Action, State } from '@/redux-types/album'

const initialState: State = {
  categories: [],
  postData: { total: 0, posts: [] }
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_CATEGORIES: {
      return {
        ...state,
        categories: action.categories
      }
    }

    case ActionType.SET_POST_DATA: {
      return {
        ...state,
        postData: {
          total: action.total,
          posts: action.posts
        }
      }
    }

    case ActionType.ADD_POST: {
      return {
        ...state,
        postData: {
          total: state.postData.total + 1,
          posts: [action.post].concat(state.postData.posts)
        }
      }
    }

    case ActionType.UPDATE_POST: {
      return {
        ...state,
        postData: {
          ...state.postData,
          posts: state.postData.posts.map((post) =>
            post._id === action.id ? { ...post, ...action.post } : post
          )
        }
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
