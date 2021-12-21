export enum AccessLevels {
  READ = '4',
  READ_WRITE = '6',
  ALL = '7'
}

export enum Apps {
  moneyTracker = 'mt'
}

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
