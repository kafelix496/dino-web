import { HYDRATE } from 'next-redux-wrapper'

import type { State as ThemeState } from './theme'

export interface HydrateAction {
  type: typeof HYDRATE
  payload: State
}

export interface State {
  theme: ThemeState
}
