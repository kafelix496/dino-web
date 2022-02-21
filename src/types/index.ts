import { AccessLevels } from '@/constants'

interface AccessUserType {
  accessUserId: string
  accessLevel: AccessLevels
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
