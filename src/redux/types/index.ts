import type { State as AppState } from './app'
import type { State as ProjectState } from './project'
import type { State as SettingState } from './setting'
import type { State as UserState } from './user'

export interface RootState {
  app: AppState
  project: ProjectState
  setting: SettingState
  user: UserState
}
