import type { User } from '@/types'

export interface State {
  user: User | null
}

export enum ActionType {
  SET_USER = 'user/setUser'
}

export interface setUserAction {
  type: ActionType.SET_USER
  user: User | null
}

export type Action = setUserAction
