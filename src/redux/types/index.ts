import type { State as AppState } from './app'
import type { State as PostState } from './post'
import type { State as ProjectState } from './project'
import type { State as SettingState } from './setting'

export interface RootState {
  app: AppState
  post: PostState
  project: ProjectState
  setting: SettingState
}
