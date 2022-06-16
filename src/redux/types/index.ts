import { HYDRATE } from 'next-redux-wrapper'

import type { State as albumState } from './album'
import type { State as ProjectState } from './project'
import type { State as SettingState } from './setting'
import type { State as UserState } from './user'

export interface RootState {
  setting: SettingState
  project: ProjectState
  user: UserState
  album: albumState
}

export interface HydrateAction {
  type: typeof HYDRATE
  payload: RootState
}
