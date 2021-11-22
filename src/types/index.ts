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
  title: string
  description?: string
  ownerId: string
  accessUsersId: AccessUserType[]
}
