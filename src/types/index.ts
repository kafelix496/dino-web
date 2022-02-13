export enum AccessLevels {
  NONE = '0',
  VIEWER = '4',
  COMMENTOR = '5',
  EDITOR = '6',
  GROUP_ADMIN = '8',
  ADMIN = '9',
  SUPER_ADMIN = '10'
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
