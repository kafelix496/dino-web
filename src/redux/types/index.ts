import { HYDRATE } from 'next-redux-wrapper'

import type { State as SettingState } from './setting'

export interface HydrateAction {
  type: typeof HYDRATE
  payload: State
}

export interface State {
  setting: SettingState
}
