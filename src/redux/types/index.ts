import { HYDRATE } from 'next-redux-wrapper'

import type { State as albumState } from './album'
import type { State as AppState } from './app'
import type { State as ProjectState } from './project'
import type { State as SettingState } from './setting'
import type { State as UserState } from './user'

export interface RootState {
  album: albumState
  app: AppState
  project: ProjectState
  setting: SettingState
  user: UserState
}

export interface HydrateAction {
  type: typeof HYDRATE
  payload: RootState
}
