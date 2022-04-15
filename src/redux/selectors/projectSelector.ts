import type { RootState } from '@/redux-types'

export const selectProjectList = (state: RootState) => state.project.projects
