import type { ThunkAction } from 'redux-thunk'

import type { RootState } from '@/redux-types'
import { ActionType } from '@/redux-types/post'
import type { Action } from '@/redux-types/post'
import type { PostUploadStatus } from '@/types/album'

export const setPostUploadStatus = (
  uploadsStatus: PostUploadStatus[]
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.SET_UPLOAD_STATUS, uploadsStatus })
  }
}

export const resetPostUploadStatus = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action
> => {
  return (dispatch) => {
    dispatch({ type: ActionType.SET_UPLOAD_STATUS, uploadsStatus: [] })
  }
}

export const updatePostUploadStatus = (
  index: number,
  uploadStatus: PostUploadStatus
): ThunkAction<void, RootState, unknown, Action> => {
  return (dispatch) => {
    dispatch({ type: ActionType.UPDATE_UPLOAD_STATUS, index, uploadStatus })
  }
}
