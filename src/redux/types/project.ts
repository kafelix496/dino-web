import type { Project } from '@/types'

export interface State {
  projects: Project[]
}

export enum ActionType {
  SET_PROJECTS = 'project/setProjects',
  ADD_PROJECT = 'project/addProject',
  UPDATE_PROJECT = 'project/updateProject',
  DELETE_PROJECT = 'project/deleteProject'
}

export interface setProjectsAction {
  type: ActionType.SET_PROJECTS
  projects: Project[]
}

export interface addProjectAction {
  type: ActionType.ADD_PROJECT
  project: Project
}

export interface updateProjectAction {
  type: ActionType.UPDATE_PROJECT
  id: string
  project: Pick<Project, 'title' | 'description'>
}

export interface deleteProjectAction {
  type: ActionType.DELETE_PROJECT
  id: string
}

export type Action =
  | setProjectsAction
  | addProjectAction
  | updateProjectAction
  | deleteProjectAction
