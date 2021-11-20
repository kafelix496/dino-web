import { HYDRATE } from 'next-redux-wrapper'

import { State as ThemeState } from './theme'

export interface HydrateAction {
  type: typeof HYDRATE
  payload: State
}

export interface State {
  theme: ThemeState
}
