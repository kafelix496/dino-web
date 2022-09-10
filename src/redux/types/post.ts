import type { PostUploadStatus } from '@/types/album'

export interface State {
  uploadsStatus: PostUploadStatus[]
}

export enum ActionType {
  SET_UPLOAD_STATUS = 'post/setUploadStatus',
  UPDATE_UPLOAD_STATUS = 'post/updateUploadStatus'
}

export interface setPostUploadStatusAction {
  type: ActionType.SET_UPLOAD_STATUS
  uploadsStatus: PostUploadStatus[]
}

export interface updatePostUploadStatusAction {
  type: ActionType.UPDATE_UPLOAD_STATUS
  index: number
  uploadStatus: PostUploadStatus
}

export type Action = setPostUploadStatusAction | updatePostUploadStatusAction
