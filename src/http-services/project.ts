import axios from 'axios'

import { Apps } from '@/constants/app'
import type { AxiosRequestConfig, Project } from '@/types'

const projectHttpService = {
  getProjects: (
    data: { appAbbreviation: Apps },
    config?: AxiosRequestConfig
  ): Promise<Project[]> =>
    axios
      .get<Project[]>(
        `${process.env.PAGE_URL ?? ''}/api/app/${data.appAbbreviation}/project`,
        config
      )
      .then((res) => res.data),
  createProject: (
    data: {
      appAbbreviation: Apps
      values: Pick<Project, 'title' | 'description'>
    },
    config?: AxiosRequestConfig
  ): Promise<Project> =>
    axios
      .post<Project>(
        `/api/app/${data.appAbbreviation}/project`,
        data.values,
        config
      )
      .then((res) => res.data),
  updateProject: (
    data: {
      appAbbreviation: Apps
      id: string
      values: Pick<Project, 'title' | 'description'>
    },
    config?: AxiosRequestConfig
  ): Promise<Project> =>
    axios
      .put<Project>(
        `/api/app/${data.appAbbreviation}/project/${data.id}`,
        data.values,
        config
      )
      .then((res) => res.data),
  deleteProject: (
    data: {
      appAbbreviation: Apps
      id: string
    },
    config?: AxiosRequestConfig
  ): Promise<void> =>
    axios
      .delete(`/api/app/${data.appAbbreviation}/project/${data.id}`, config)
      .then(() => undefined)
}

export default projectHttpService
