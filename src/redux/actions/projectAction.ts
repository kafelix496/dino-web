import type { ThunkAction } from 'redux-thunk'

import type { RootState } from '@/redux-types'
import { ActionType } from '@/redux-types/project'
import type { Action } from '@/redux-types/project'
import type { Project } from '@/types'

export const setProjects = (
  projects: Project[]
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.SET_PROJECTS, projects })
  }
}

export const addProject = (
  project: Project
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.ADD_PROJECT, project })
  }
}

export const editProject = (
  id: string,
  project: Project | Pick<Project, 'title' | 'description'>
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.EDIT_PROJECT, id, project })
  }
}

export const deleteProject = (
  id: string
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.DELETE_PROJECT, id })
  }
}
