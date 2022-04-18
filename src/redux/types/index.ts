import { HYDRATE } from 'next-redux-wrapper'

import type { State as ProjectState } from './project'
import type { State as SettingState } from './setting'
import type { State as UserState } from './user'

export interface RootState {
  setting: SettingState
  project: ProjectState
  user: UserState
}

export interface HydrateAction {
  type: typeof HYDRATE
  payload: RootState
}
