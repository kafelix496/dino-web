import { AccessLevels } from '@/constants'

interface AccessUserType {
  accessUserId: string
  accessLevel: AccessLevels
}

export interface User {
  _id: string
  name: string
  email?: string
  emailVerified: string | null
  image: string
  // NOTE: 496-1
  faAccessLevel: AccessLevels
  mtAccessLevel: AccessLevels
}

export interface ProjectType {
  _id: string
  title: string
  description?: string
  ownerId: string
  createdAt: string
  updatedAt: string
  accessUsersId: AccessUserType[]
}
