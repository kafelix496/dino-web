import type { AxiosRequestConfig as _AxiosRequestConfig } from 'axios'

import { AccessLevels } from '@/constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AxiosRequestConfig = _AxiosRequestConfig<any>

interface AccessUser {
  accessUserId: string
  accessLevel: AccessLevels
}

export interface User {
  _id: string
  name: string
  email?: string
  emailVerified: null
  image: string
  // NOTE: 496-1
  faAccessLevel: AccessLevels
  mtAccessLevel: AccessLevels
  createdAt: string
  updatedAt: string
}

export interface Project {
  _id: string
  title: string
  description: string
  ownerId: string
  createdAt: string
  updatedAt: string
  accessUsersId: AccessUser[]
}
