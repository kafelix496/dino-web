import { HYDRATE } from 'next-redux-wrapper'

import type { State as SettingsState } from './settings'

export interface HydrateAction {
  type: typeof HYDRATE
  payload: State
}

export interface State {
  settings: SettingsState
}
