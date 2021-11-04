import { HYDRATE } from 'next-redux-wrapper'

import { State as TodoState } from './todo'

export interface HydrateAction {
  type: typeof HYDRATE
  payload: State
}

export interface State {
  todo: TodoState
}
