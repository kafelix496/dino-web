export enum AccessLevelType {
  READ = '4',
  READ_WRITE = '6',
  ALL = '7'
}

interface AccessUserType {
  accessUserId: string
  accessLevel: AccessLevelType
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
