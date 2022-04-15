import type { Dispatch } from 'redux'

import { ActionType } from '@/redux-types/project'
import type { Action } from '@/redux-types/project'
import type { Project } from '@/types'

export const setProjects = (projects: Project[]) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SET_PROJECTS, projects })
  }
}

export const addProject = (project: Project) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.ADD_PROJECT, project })
  }
}

export const editProject = (
  id: string,
  project: Pick<Project, 'title' | 'description'>
) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.EDIT_PROJECT, id, project })
  }
}

export const deleteProject = (id: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.DELETE_PROJECT, id })
  }
}
