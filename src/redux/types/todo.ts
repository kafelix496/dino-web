export interface TodoItem {
  _id: string
  title: string
}

export interface State {
  todos: TodoItem[]
}

export enum ActionType {
  ADD_TODO = 'add_todo',
  REMOVE_TODO = 'remove_todo'
}

export interface AddTodoAction {
  type: ActionType.ADD_TODO
  title: string
}

export interface RemoveTodoAction {
  type: ActionType.REMOVE_TODO
  id: string
}

export type Action = AddTodoAction | RemoveTodoAction
