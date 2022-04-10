import { HYDRATE } from 'next-redux-wrapper'

import type { State as ProjectState } from './project'
import type { State as SettingState } from './setting'

export interface RootState {
  setting: SettingState
  project: ProjectState
}

export interface HydrateAction {
  type: typeof HYDRATE
  payload: RootState
}
