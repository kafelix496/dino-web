import { Action, ActionType } from '../types/todo'

import type { Dispatch } from 'redux'

export const addTodo = (title: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_TODO,
      title: title
    })
  }
}

export const removeTodo = (id: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REMOVE_TODO,
      id
    })
  }
}
